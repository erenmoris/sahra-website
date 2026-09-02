"""Extract Arabic-only Sahra wordmark with transparent background."""

from __future__ import annotations

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "brand" / "logo-full.png"
OUT = ROOT / "public" / "brand"


def rgba_array(im: Image.Image) -> np.ndarray:
    return np.array(im.convert("RGBA"), dtype=np.uint8)


def saturation(r: np.ndarray, g: np.ndarray, b: np.ndarray) -> np.ndarray:
    rf, gf, bf = r.astype(np.float32), g.astype(np.float32), b.astype(np.float32)
    mx = np.maximum(np.maximum(rf, gf), bf)
    mn = np.minimum(np.minimum(rf, gf), bf)
    return np.divide(mx - mn, mx, out=np.zeros_like(mx), where=mx > 0)


def luminance(r: np.ndarray, g: np.ndarray, b: np.ndarray) -> np.ndarray:
    rf, gf, bf = r.astype(np.float32), g.astype(np.float32), b.astype(np.float32)
    return 0.299 * rf + 0.587 * gf + 0.114 * bf


def flood_background_mask(arr: np.ndarray) -> np.ndarray:
    h, w = arr.shape[:2]
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    lum = luminance(r, g, b)
    sat = saturation(r, g, b)

    is_bg = ((lum < 78) & (sat < 0.28)) | (lum < 32)
    visited = np.zeros((h, w), dtype=bool)
    q: deque[tuple[int, int]] = deque()

    # Do not seed from the bottom edge — letter tails sit there (e.g. ر).
    for x in range(w):
        if is_bg[0, x] and not visited[0, x]:
            visited[0, x] = True
            q.append((0, x))
    for y in range(h):
        for x in (0, w - 1):
            if is_bg[y, x] and not visited[y, x]:
                visited[y, x] = True
                q.append((y, x))

    while q:
        y, x = q.popleft()
        for dy, dx in ((0, 1), (0, -1), (1, 0), (-1, 0)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx] and is_bg[ny, nx]:
                visited[ny, nx] = True
                q.append((ny, nx))

    return visited


def foreground_mask(arr: np.ndarray, bg: np.ndarray) -> np.ndarray:
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    rf, gf, bf = r.astype(np.float32), g.astype(np.float32), b.astype(np.float32)
    lum = luminance(r, g, b)
    sat = saturation(r, g, b)

    core = (
        ((rf > 78) & (gf > 50) & (sat > 0.07))
        | (lum > 105)
        | ((lum > 62) & (sat > 0.14) & ((rf + gf) > bf * 1.05))
        | ((lum > 32) & (sat > 0.10) & ((rf + gf) > bf * 0.85))
    )

    try:
        from scipy.ndimage import binary_dilation, binary_erosion

        fg = binary_dilation(core, iterations=5)
        fg = binary_erosion(fg, iterations=1)
        fg = binary_dilation(fg, iterations=1)
    except ImportError:
        fg = core

    navy_haze = (lum < 72) & (bf > rf * 0.95) & (bf > gf * 0.9) & (sat < 0.22)
    fg = fg & ~navy_haze & ~bg

    h, w = fg.shape
    y_idx = np.arange(h)[:, None]
    x_idx = np.arange(w)[None, :]
    word_band = (x_idx >= 250) & (x_idx <= 980)

    # Restore bottom stroke pixels (ر tail) and any bright ink in the word band.
    bottom = y_idx >= int(h * 0.78)
    stroke = (lum > 28) & (sat > 0.06) & ((rf + gf) > bf * 0.7)
    bright_ink = (lum > 50) & (sat > 0.05)
    fg = fg | (bottom & stroke & word_band & ~bg) | (bright_ink & word_band & ~bg)

    return fg


def bbox_alpha(im: Image.Image, threshold: int = 12) -> tuple[int, int, int, int] | None:
    arr = rgba_array(im)
    alpha = arr[:, :, 3]
    rows = np.where(alpha.max(axis=1) > threshold)[0]
    cols = np.where(alpha.max(axis=0) > threshold)[0]
    if rows.size == 0 or cols.size == 0:
        return None
    return int(cols[0]), int(rows[0]), int(cols[-1]) + 1, int(rows[-1]) + 1


def center_on_canvas(im: Image.Image, pad_x: int = 24, pad_y: int = 32) -> Image.Image:
    bb = bbox_alpha(im)
    if not bb:
        return im
    x0, y0, x1, y1 = bb
    cropped = im.crop((x0, y0, x1, y1))
    cw, ch = cropped.size
    canvas = Image.new("RGBA", (cw + pad_x * 2, ch + pad_y * 2), (0, 0, 0, 0))
    canvas.paste(cropped, (pad_x, pad_y), cropped)
    return canvas


def extract_arabic_wordmark(src: Path) -> Image.Image:
    im = Image.open(src).convert("RGBA")
    w, h = im.size

    arabic = im.crop((0, 0, w, int(h * 0.565)))
    arr = rgba_array(arabic)
    bg = flood_background_mask(arr)
    fg = foreground_mask(arr, bg)

    out = arr.copy()
    out[:, :, 3] = (fg.astype(np.uint8) * 255)

    result = Image.fromarray(out)
    bb = bbox_alpha(result, threshold=10)
    if bb:
        pad_t, pad_x, pad_b = 16, 12, 32
        x0, y0, x1, y1 = bb
        result = result.crop(
            (
                max(0, x0 - pad_x),
                max(0, y0 - pad_t),
                min(arabic.width, x1 + pad_x),
                min(arabic.height, y1 + pad_b),
            )
        )

    return center_on_canvas(result)


def main() -> None:
    logo = extract_arabic_wordmark(SRC)
    names = ["logo-header.png", "logo-ar.png", "logo-en.png"]
    for name in names:
        logo.save(OUT / name, optimize=True)
    print("saved", logo.size, "->", ", ".join(names))


if __name__ == "__main__":
    main()
