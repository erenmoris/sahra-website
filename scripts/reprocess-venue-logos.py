"""Reprocess downloaded venue assets into final ticker logos."""
from __future__ import annotations

from io import BytesIO
from pathlib import Path

import requests
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "venues" / "logos"

DIRECT = {
    "lemon-tree-and-co": "https://tltconcepts.com/images/Tree.png",
    "the-origin": "https://tltconcepts.com/images/Logos-larg/PNG/TheOrigins_Logo.png",
    "villa-coconut": "https://tltconcepts.com/images/Logos-larg/PNG/Hospitality/Villa%20Coconut.png",
    "esca-cueva": "https://i0.wp.com/escahospitality.com/wp-content/uploads/2025/09/Esca-Cueva-logo.png?ssl=1",
    "esca-playa": "https://i0.wp.com/escahospitality.com/wp-content/uploads/2025/09/Esca-Playa-logo.png?ssl=1",
    "satchi": "https://static.wixstatic.com/media/f3847d_07f36910360641e18ac21adccf37e4fc~mv2.png",
}

IG_SLUGS = [
    "amelia",
    "anzu-rooftop",
    "ava",
    "dusit",
    "idol",
    "me-bar",
    "moon-deck",
    "mood-bar",
    "outdoor",
    "rovi",
    "sangria",
]


def normalize_for_dark_bg(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    img = ImageOps.exif_transpose(img)
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)

    bg = Image.new("RGBA", img.size, (0, 0, 0, 255))
    flat = Image.alpha_composite(bg, img).convert("RGB")
    pixels = list(flat.getdata())
    avg = sum(sum(p) for p in pixels) / (len(pixels) * 3) if pixels else 0

    if avg > 170:
        rgba = img.convert("RGBA")
        data = rgba.getdata()
        new_data = []
        for r, g, b, a in data:
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            if lum > 210:
                new_data.append((0, 0, 0, 0))
            else:
                strength = max(0.0, min(1.0, (210 - lum) / 210))
                v = int(220 + 35 * strength)
                new_data.append((v, int(v * 0.96), int(v * 0.88), int(255 * strength)))
        rgba.putdata(new_data)
    else:
        rgba = flat.convert("RGBA")
        data = rgba.getdata()
        new_data = []
        for r, g, b, a in data:
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            if lum < 45:
                new_data.append((0, 0, 0, 0))
            else:
                boost = min(1.35, 220 / max(lum, 1))
                new_data.append(
                    (
                        min(255, int(r * boost)),
                        min(255, int(g * boost)),
                        min(255, int(b * boost * 0.95)),
                        255,
                    )
                )
        rgba.putdata(new_data)

    target_h = 96
    w, h = rgba.size
    if h > target_h:
        rgba = rgba.resize((max(1, int(w * target_h / h)), target_h), Image.Resampling.LANCZOS)
    return rgba


def save_processed(slug: str, raw: bytes) -> None:
    img = Image.open(BytesIO(raw))
    out = OUT / f"{slug}.png"
    normalize_for_dark_bg(img).save(out, "PNG", optimize=True)
    print(f"saved {slug}.png ({out.stat().st_size} bytes)")


def main() -> None:
    session = requests.Session()
    session.headers["User-Agent"] = "Mozilla/5.0"

    for slug, url in DIRECT.items():
        r = session.get(url, timeout=25)
        r.raise_for_status()
        save_processed(slug, r.content)

    for slug in IG_SLUGS:
        src = OUT / f"{slug}-ig.jpg"
        if src.exists():
            save_processed(slug, src.read_bytes())

    print("done")


if __name__ == "__main__":
    main()
