"""Flag venue logos that look like personal photos (square IG avatars)."""
from pathlib import Path
from PIL import Image, ImageStat

OUT = Path(__file__).resolve().parents[1] / "public" / "venues" / "logos"

for p in sorted(OUT.glob("*.png")):
    img = Image.open(p).convert("RGB")
    w, h = img.size
    stat = ImageStat.Stat(img)
    # Photos: near-square, many distinct colors, not mostly transparent edges
    colors = len(img.getcolors(maxcolors=256 * 256) or [])
    ratio = w / h if h else 1
    square = 0.85 <= ratio <= 1.15
    colorful = colors > 800
    avg = sum(stat.mean) / 3
    tag = "PHOTO?" if square and colorful and w < 400 else "logo"
    print(f"{tag:6} {p.name:28} {w}x{h} colors={colors} avg={avg:.0f}")
