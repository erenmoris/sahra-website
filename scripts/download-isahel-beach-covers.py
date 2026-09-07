"""Download iSahel beach listing card images into public/beaches/covers."""
from __future__ import annotations

import os
import urllib.request

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "beaches", "covers")
os.makedirs(OUT, exist_ok=True)

# slug -> source URL from isahel.com/#/c/beach
IMAGES = {
    "noya-beach": "https://isahel.com/assets/listings/noya-beach/noya-beach-1.card.webp",
    "karl-beach-club": "https://isahel.com/assets/listings/karl-beach-club/karl-beach-club-6.webp",
    "massimo-beach-club": "https://isahel.com/assets/listings/massimo-beach-club/massimo-beach-club-1.card.webp",
    "kyma-beach": "https://isahel.com/assets/listings/kyma-beach/kyma-beach-1.card.webp",
    "marassi-water-world": "https://isahel.com/assets/listings/marassi-water-world/marassi-water-world-1.card.webp",
    "sass": "https://isahel.com/assets/listings/sass/sass-1.webp",
    "esca": "https://isahel.com/assets/listings/esca/esca-1.webp",
    "kikis": "https://isahel.com/assets/listings/kikis/kikis-1.webp",
    "baia": "https://isahel.com/assets/listings/baia/baia-1.webp",
    "sol-beach": "https://isahel.com/assets/listings/Sol%20Beach/Sol%20Beach1.card.webp",
    "the-smokery-beach": "https://isahel.com/assets/listings/The%20smokery%20beach/The%20smokery%20beach1.card.webp",
    "cocoon": "https://isahel.com/assets/listings/Cocoon/Cocoon%20Lounge1.webp",
    "maasoom": "https://isahel.com/assets/listings/Maa'soom/Maasoom1.card.webp",
    "bar-du-port": "https://isahel.com/assets/listings/Bar%20Du%20Port/Bar%20Du%20Port1.webp",
    "trope-beach-club": "https://isahel.com/assets/listings/Trope%20Beach%20Club/Trope%20%20Beach%20Club1.card.webp",
    "babbos-taverna": "https://isahel.com/assets/listings/Babbo's%20Taverna/Babbo's%20Taverna0.card.webp",
    "kokomo": "https://isahel.com/assets/listings/Kokomo/Kokomo1.card.webp",
    "one-beachouse": "https://isahel.com/assets/listings/one-beachouse/one-beachouse-1.card.webp",
    "la-femme-ladies-beach": "https://isahel.com/assets/listings/la-femme-ladies-beach/la-femme-ladies-beach-4.webp",
    "gitana-ladies-beach": "https://isahel.com/assets/listings/gitana-ladies-beach/gitana-ladies-beach-1.card.webp",
    "al-yashmak-ladies-beach": "https://isahel.com/assets/listings/al-yashmak-ladies-beach/al-yashmak-ladies-beach-1.card.webp",
    "la-taiga-beach-resort": "https://isahel.com/assets/listings/la-taiga-beach-resort/la-taiga-beach-resort-3.webp",
}

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

ok = 0
for slug, url in IMAGES.items():
    dest = os.path.join(OUT, f"{slug}.webp")
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA, "Referer": "https://isahel.com/"})
        with urllib.request.urlopen(req, timeout=45) as r:
            data = r.read()
        if len(data) < 800:
            print("SKIP small", slug, len(data))
            continue
        with open(dest, "wb") as f:
            f.write(data)
        ok += 1
        print("OK", slug, len(data))
    except Exception as e:
        print("FAIL", slug, e)

print(f"done {ok}/{len(IMAGES)}")
