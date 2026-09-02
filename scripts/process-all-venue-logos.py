"""Rebuild venue logos: official assets + wordmarks only (no Instagram profile photos)."""
from __future__ import annotations

import sys
from io import BytesIO
from pathlib import Path

import requests
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "venues" / "logos"

# Official brand assets from venue / group websites
DIRECT: dict[str, str] = {
    "lemon-tree-and-co": "https://tltconcepts.com/images/Tree.png",
    "the-origin": "https://tltconcepts.com/images/Logos-larg/PNG/TheOrigins_Logo.png",
    "villa-coconut": "https://tltconcepts.com/images/Logos-larg/PNG/Hospitality/Villa%20Coconut.png",
    "esca-cueva": "https://i0.wp.com/escahospitality.com/wp-content/uploads/2025/09/Esca-Cueva-logo.png?ssl=1",
    "esca-playa": "https://i0.wp.com/escahospitality.com/wp-content/uploads/2025/09/Esca-Playa-logo.png?ssl=1",
    "satchi": "https://static.wixstatic.com/media/f3847d_07f36910360641e18ac21adccf37e4fc~mv2.png",
    "maison-de-la-plage": "https://static.wixstatic.com/media/67a7fa_96489ec29f1343d8b261207719f8d92b~mv2.png",
    "the-smokery": (
        "https://static.wixstatic.com/media/c8fcaa_b993d601b2904ac99bf7a0798b2e1d1f~mv2_d_1500_1500_s_2.png"
        "/v1/crop/x_333,y_336,w_901,h_904/thesmokerylogo_ko_splash.png"
    ),
}

# Already confirmed real brand marks (downloaded from IG when profile pic = logo)
PRESERVE = {
    "anzu-rooftop",
    "ava",
    "bdp-beach",
    "idol",
    "kikis-beach",
    "kyma-beach",
    "little-lexies",
    "me-bar",
    "opia",
    "outdoor",
    "rovi",
    "sangria",
}

# Clean typographic fallbacks when no official file is available
WORDMARKS: dict[str, tuple[str, str | None]] = {
    "amelia": ("AMELIA", "BY THE SEA"),
    "ahm-sahel": ("AHM", "SAHEL"),
    "bleu-vert": ("BLEU", "VERT"),
    "cairo-jazz-club": ("CAIRO", "JAZZ CLUB"),
    "kanter": ("KANTER", None),
    "kazoku": ("KAZOKU", None),
    "lucida": ("LUCIDA", None),
    "mood-bar": ("MOOD", "BAR"),
    "nobu-ogami": ("NOBU", None),
    "pier-88": ("PIER", "88"),
    "riverside": ("RIVERSIDE", None),
    "sass-beach": ("SASS", "BEACH"),
    "sol-beach": ("SOL", "BEACH"),
    "sonbola": ("SONBOLA", None),
    "tabla-luna": ("TABLA", "LUNA"),
    "tap-east": ("TAP", "EAST"),
    "zenz": ("ZENZ", None),
}


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
    print(f"  official  {slug}.png")


def make_wordmark(slug: str, line1: str, line2: str | None) -> None:
    font_big = ImageFont.truetype("C:/Windows/Fonts/timesbd.ttf", 36)
    font_small = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 12)
    probe = ImageDraw.Draw(Image.new("RGBA", (1, 1)))

    lines: list[tuple[str, ImageFont.FreeTypeFont]] = [(line1, font_big)]
    if line2:
        lines.append((line2, font_small))

    widths, heights = [], []
    for text, font in lines:
        bbox = probe.textbbox((0, 0), text, font=font)
        widths.append(bbox[2] - bbox[0])
        heights.append(bbox[3] - bbox[1])

    w = max(widths) + 24
    h = sum(heights) + 8 * (len(lines) + 1)
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    y = 8
    for text, font in lines:
        bbox = draw.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        draw.text(((w - tw) // 2 - bbox[0], y - bbox[1]), text, font=font, fill=(232, 220, 196, 235))
        y += (bbox[3] - bbox[1]) + 6

    out = OUT / f"{slug}.png"
    normalize_for_dark_bg(img).save(out, "PNG", optimize=True)
    print(f"  wordmark  {slug}.png")


def main() -> int:
    session = requests.Session()
    session.headers["User-Agent"] = "Mozilla/5.0"

    print("Official logos:")
    for slug, url in DIRECT.items():
        r = session.get(url, timeout=25)
        r.raise_for_status()
        save_processed(slug, r.content)

    print("Preserved (real brand marks):")
    for slug in sorted(PRESERVE):
        path = OUT / f"{slug}.png"
        print(f"  keep      {slug}.png" if path.exists() else f"  MISSING   {slug}.png")

    print("Wordmarks:")
    for slug, (l1, l2) in WORDMARKS.items():
        make_wordmark(slug, l1, l2)

    count = len(list(OUT.glob("*.png")))
    print(f"\n{count} logos total")
    return 0


if __name__ == "__main__":
    sys.exit(main())
