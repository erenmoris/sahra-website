"""Download iSahel party listing card images into public/venues/covers."""
from __future__ import annotations

import os
import urllib.request

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "venues", "covers")
os.makedirs(OUT, exist_ok=True)

# slug -> source URL from isahel.com/#/c/party
IMAGES = {
    "lemon-tree": "https://isahel.com/assets/listings/lemon-tree/lemon-tree-1.card.webp",
    "lucida": "https://isahel.com/assets/listings/lucida/lucida-1.card.webp",
    "galambo": "https://isahel.com/assets/listings/galambo/galambo-1.card.webp",
    "kikis": "https://isahel.com/assets/listings/kikis/kikis-1.webp",
    "rituals": "https://isahel.com/assets/listings/rituals/rituals-1.card.webp",
    "pier-88": "https://isahel.com/assets/listings/pier-88/pier-88-2.webp",
    "esca": "https://isahel.com/assets/listings/esca/esca-1.webp",
    "gar-alamar": "https://isahel.com/assets/listings/gar-alamar/gar-alamar-1.webp",
    "el-barrio": "https://isahel.com/assets/listings/elbarrio/elbarrio-1.webp",
    "surf-club": "https://isahel.com/assets/listings/surf-club/surf-club-1.webp",
    "baia": "https://isahel.com/assets/listings/baia/baia-2.webp",
    "sass": "https://isahel.com/assets/listings/sass/sass-1.webp",
    "sol-beach": "https://isahel.com/assets/listings/Sol%20Beach/Sol%20Beach1.card.webp",
    "the-smokery-beach": "https://isahel.com/assets/listings/The%20smokery%20beach/The%20smokery%20beach1.card.webp",
    "cocoon": "https://isahel.com/assets/listings/Cocoon/Cocoon%20Lounge1.webp",
    "maasoom": "https://isahel.com/assets/listings/Maa'soom/Maasoom1.card.webp",
    "at-9": "https://isahel.com/assets/listings/at%209/at%209%201.webp",
    "amelia-beirut": "https://isahel.com/assets/listings/amelia%20beirut/Amelia%20Beirut1.card.webp",
    "la-casa": "https://isahel.com/assets/listings/la%20casa/la%20casa1.card.webp",
    "o-by-michel": "https://isahel.com/assets/listings/O%20By%20Michel/O%20by%20Michel1.webp",
    "greeka": "https://isahel.com/assets/listings/Greeka/Greeka1.webp",
    "taratsa": "https://isahel.com/assets/listings/Trasta/Taratsa1.card.webp",
    "sky-20": "https://isahel.com/assets/listings/Sky20/Sky%2020%201.card.webp",
    "perle": "https://isahel.com/assets/listings/Perle/Perle%201.card.webp",
    "sangria-restaurant": "https://isahel.com/assets/listings/Sangria/Sangriav2.card.webp",
    "bar-du-port": "https://isahel.com/assets/listings/Bar%20Du%20Port/Bar%20Du%20Port1.webp",
    "cocoya": "https://isahel.com/assets/listings/Cocoya/Cocoya1.webp",
    "iris": "https://isahel.com/assets/listings/Iris/Iris1.card.webp",
    "charl": "https://isahel.com/assets/listings/Charl/Charl1.card.webp",
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
