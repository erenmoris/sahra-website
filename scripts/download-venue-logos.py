"""Download venue logos from official sources and Instagram profile pictures."""
from __future__ import annotations

import html
import re
import sys
from io import BytesIO
from pathlib import Path
from urllib.parse import quote, unquote, urlparse

import requests
from PIL import Image, ImageEnhance, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "venues" / "logos"
OUT.mkdir(parents=True, exist_ok=True)

SESSION = requests.Session()
SESSION.headers.update(
    {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
        )
    }
)

# slug -> list of (source label, url)
SOURCES: dict[str, list[tuple[str, str]]] = {
    "lemon-tree-and-co": [
        ("tlt", "https://tltconcepts.com/images/Tree.png"),
        ("tlt", "https://tltconcepts.com/images/newLogo/TLT%20FINAL%20LOGO-01.png"),
    ],
    "the-origin": [
        ("tlt", "https://tltconcepts.com/images/Logos-larg/PNG/Hospitality/The%20Origins.png"),
        ("tlt", "https://tltconcepts.com/images/Logos-larg/PNG/TheOrigins_Logo.png"),
    ],
    "villa-coconut": [
        ("tlt", "https://tltconcepts.com/images/Logos-larg/PNG/Hospitality/Villa%20Coconut.png"),
    ],
    "esca-cueva": [
        (
            "esca",
            "https://i0.wp.com/escahospitality.com/wp-content/uploads/2025/09/Esca-Cueva-logo.png?ssl=1",
        ),
    ],
    "esca-playa": [
        (
            "esca",
            "https://i0.wp.com/escahospitality.com/wp-content/uploads/2025/09/Esca-Playa-logo.png?ssl=1",
        ),
    ],
    "satchi": [
        (
            "sachi",
            "https://static.wixstatic.com/media/f3847d_07f36910360641e18ac21adccf37e4fc~mv2.png",
        ),
    ],
    "amelia": [
        ("unavatar", "https://unavatar.io/instagram/ameliabythesea.eg"),
        ("unavatar", "https://unavatar.io/instagram/ameliabythesea"),
    ],
    "ava": [
        ("unavatar", "https://unavatar.io/instagram/clubava.eg"),
        ("unavatar", "https://unavatar.io/instagram/ava.eg"),
    ],
    "dusit": [
        ("unavatar", "https://unavatar.io/instagram/dusitthanihotels"),
        ("web", "https://www.dusit.com/favicon.ico"),
    ],
    "moon-deck": [
        ("unavatar", "https://unavatar.io/instagram/moondeck.eg"),
        ("unavatar", "https://unavatar.io/instagram/moondeckcairo"),
    ],
    "rovi": [
        ("unavatar", "https://unavatar.io/instagram/roviegypt"),
    ],
    "me-bar": [
        ("unavatar", "https://unavatar.io/instagram/mebar.eg"),
        ("unavatar", "https://unavatar.io/instagram/mebarcairo"),
    ],
    "sangria": [
        ("unavatar", "https://unavatar.io/instagram/sangria.eg"),
        ("unavatar", "https://unavatar.io/instagram/sangriacairo"),
    ],
    "idol": [
        ("unavatar", "https://unavatar.io/instagram/idolrestobar.eg"),
    ],
    "outdoor": [
        ("unavatar", "https://unavatar.io/instagram/outdoor.eg"),
        ("unavatar", "https://unavatar.io/instagram/outdoorcairo"),
    ],
    "mood-bar": [
        ("unavatar", "https://unavatar.io/instagram/moodbar.eg"),
        ("unavatar", "https://unavatar.io/instagram/moodbarcairo"),
    ],
    "anzu-rooftop": [
        ("unavatar", "https://unavatar.io/instagram/anzu.eg"),
    ],
}

DISPLAY_NAMES = {
    "lemon-tree-and-co": "Lemon Tree & Co",
    "amelia": "Amelia",
    "ava": "Ava",
    "esca-cueva": "Esca Cueva",
    "esca-playa": "Esca Playa",
    "the-origin": "The Origin",
    "dusit": "Dusit",
    "moon-deck": "Moon Deck",
    "rovi": "Rovi",
    "me-bar": "Me Bar",
    "satchi": "Sachi",
    "villa-coconut": "Villa Coconut",
    "sangria": "Sangria",
    "idol": "Idol",
    "outdoor": "Outdoor",
    "mood-bar": "Mood Bar",
    "anzu-rooftop": "Anzu",
}


def fetch_bytes(url: str) -> bytes | None:
    try:
        r = SESSION.get(url, timeout=25, allow_redirects=True)
        if r.status_code != 200 or not r.content:
            return None
        ctype = r.headers.get("content-type", "")
        if "text/html" in ctype and "image" not in ctype:
            return None
        if len(r.content) < 400:
            return None
        return r.content
    except requests.RequestException:
        return None


def normalize_for_dark_bg(img: Image.Image) -> Image.Image:
    """Make logos readable on the site's dark ticker strip."""
    img = img.convert("RGBA")
    img = ImageOps.exif_transpose(img)

    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)

    # Flatten onto black to measure luminance
    bg = Image.new("RGBA", img.size, (0, 0, 0, 255))
    flat = Image.alpha_composite(bg, img).convert("RGB")
    pixels = list(flat.getdata())
    if not pixels:
        return img

    avg = sum(sum(p) for p in pixels) / (len(pixels) * 3)

    # Light-background brand marks (Esca, Sachi, etc.) -> keep only dark ink as light
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
        # Dark-background or coloured marks -> knock out dark pixels, keep highlights
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
        new_w = max(1, int(w * target_h / h))
        rgba = rgba.resize((new_w, target_h), Image.Resampling.LANCZOS)

    return rgba


def save_logo(slug: str, raw: bytes) -> bool:
    try:
        img = Image.open(BytesIO(raw))
    except Exception:
        return False

    if img.size[0] < 24 or img.size[1] < 24:
        return False

    processed = normalize_for_dark_bg(img)
    out = OUT / f"{slug}.png"
    processed.save(out, "PNG", optimize=True)
    return True


def scrape_page_images(page_url: str) -> list[str]:
    html_text = SESSION.get(page_url, timeout=20).text
    html_text = html.unescape(html_text)
    found: list[str] = []
    for match in re.findall(r'(?:src|href)="([^"]+\.(?:png|jpg|jpeg|webp|svg)[^"]*)"', html_text, re.I):
        if match.startswith("//"):
            match = "https:" + match
        elif match.startswith("/"):
            base = f"{urlparse(page_url).scheme}://{urlparse(page_url).netloc}"
            match = base + match
        elif not match.startswith("http"):
            base = page_url.rsplit("/", 1)[0] + "/"
            match = base + match.lstrip("/")
        found.append(match.split("?")[0] if "wixstatic" not in match else match)
    return found


def pick_best_logo(urls: list[str], keywords: list[str]) -> str | None:
    scored: list[tuple[int, str]] = []
    for url in urls:
        low = unquote(url).lower()
        score = 0
        for kw in keywords:
            if kw in low:
                score += 10
        if "logo" in low:
            score += 8
        if low.endswith(".svg"):
            score += 2
        if "favicon" in low or "icon" in low:
            score -= 5
        if "award" in low or "banner" in low or "gallery" in low or "gallary" in low:
            score -= 8
        scored.append((score, url))
    scored.sort(reverse=True)
    return scored[0][1] if scored and scored[0][0] > 0 else None


def try_scrape(slug: str, page: str, keywords: list[str]) -> bool:
    try:
        urls = scrape_page_images(page)
    except requests.RequestException:
        return False
    best = pick_best_logo(urls, keywords)
    if not best:
        return False
    raw = fetch_bytes(best)
    if raw and save_logo(slug, raw):
        print(f"  OK scrape {slug} <- {best}")
        return True
    return False


def make_wordmark(slug: str, text: str) -> bool:
    from PIL import ImageDraw, ImageFont

    font = None
    for path in (
        "C:/Windows/Fonts/segoeuib.ttf",
        "C:/Windows/Fonts/arialbd.ttf",
        "C:/Windows/Fonts/arial.ttf",
    ):
        try:
            font = ImageFont.truetype(path, 42)
            break
        except OSError:
            continue
    if font is None:
        font = ImageFont.load_default()

    tmp = Image.new("RGBA", (1, 1))
    draw = ImageDraw.Draw(tmp)
    bbox = draw.textbbox((0, 0), text, font=font)
    w = bbox[2] - bbox[0] + 24
    h = bbox[3] - bbox[1] + 16
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.text((12 - bbox[0], 8 - bbox[1]), text, font=font, fill=(232, 220, 196, 230))
    out = OUT / f"{slug}.png"
    img.save(out, "PNG", optimize=True)
    print(f"  OK wordmark {slug}")
    return True


def main() -> int:
    results: dict[str, str] = {}

    for slug, sources in SOURCES.items():
        if (OUT / f"{slug}.png").exists():
            print(f"skip {slug} (exists)")
            results[slug] = "exists"
            continue

        saved = False
        for label, url in sources:
            raw = fetch_bytes(url)
            if raw and save_logo(slug, raw):
                print(f"  OK {label} {slug} <- {url}")
                results[slug] = label
                saved = True
                break
            print(f"  -- {label} {slug} failed")

        if saved:
            continue

    # Secondary scrape passes
    scrape_targets = [
        ("amelia", "https://www.addresshotels.com/en/restaurant/amelia-beirut-egypt-by-the-sea/", ["amelia", "logo"]),
        ("dusit", "https://www.dusit.com/", ["dusit", "logo"]),
        ("ava", "https://www.instagram.com/clubava.eg/", ["club", "ava"]),
    ]
    for slug, page, kws in scrape_targets:
        if slug in results or (OUT / f"{slug}.png").exists():
            continue
        if try_scrape(slug, page, kws):
            results[slug] = "scrape"

    # Wordmark fallback for anything still missing
    for slug, text in DISPLAY_NAMES.items():
        if (OUT / f"{slug}.png").exists():
            continue
        make_wordmark(slug, text)
        results[slug] = "wordmark"

    print("\nSummary:")
    for slug in SOURCES:
        path = OUT / f"{slug}.png"
        status = results.get(slug, "missing")
        size = f"{path.stat().st_size}B" if path.exists() else "-"
        print(f"  {slug}: {status} ({size})")

    return 0


if __name__ == "__main__":
    sys.exit(main())
