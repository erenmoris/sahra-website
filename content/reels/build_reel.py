#!/usr/bin/env python3
"""Assemble the Sahra VIP Reels (9:16) — clean visuals + natural Arabic VO."""

from __future__ import annotations

import asyncio
import json
import subprocess
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Run: pip install pillow edge-tts")
    sys.exit(1)

ROOT = Path(__file__).resolve().parent
ASSETS = ROOT / "assets"
OUT = ROOT / "output"

SCENES = [
    {
        "image": "reels-scene1-queue.png",
        "vo": "زهقت تسمع، انتظر نص ساعة كمان؟",
    },
    {
        "image": "reels-scene2-phone.png",
        "vo": "مع سهرة، وفّر وقتك وتخطّى كل الطوابير.",
    },
    {
        "image": "reels-vip-scene-reference.png",
        "vo": "احجز أفضل ترابيزات VIP في أرقى أماكن الساحل والقاهرة، بضغطة واحدة.",
    },
    {
        "image": "reels-scene4-drone.png",
        "vo": "متضيعش وقتك. ابعت كلمة VIP على الواتساب، واحجز مكانك الليلة.",
    },
]

# Egyptian Arabic male — professional concierge tone
VOICE = "ar-EG-ShakirNeural"
VO_RATE = "-12%"
VO_PITCH = "+0Hz"
SCENE_PAD = 0.3  # seconds of breathing room after each line


def probe_duration(path: Path) -> float:
    out = subprocess.run(
        [
            "ffprobe", "-v", "quiet", "-print_format", "json",
            "-show_entries", "format=duration", str(path),
        ],
        check=True,
        capture_output=True,
        text=True,
    )
    return float(json.loads(out.stdout)["format"]["duration"])


def prepare_frame(src: Path, dst: Path) -> None:
    """Resize only — no text overlays."""
    img = Image.open(src).convert("RGB")
    if img.size != (1080, 1920):
        img = img.resize((1080, 1920), Image.Resampling.LANCZOS)
    img.save(dst, quality=95)


def polish_voice(src: Path, dst: Path) -> None:
    """Light cleanup so speech sits clearly on Reels."""
    subprocess.run(
        [
            "ffmpeg", "-y", "-i", str(src),
            "-af",
            "highpass=f=90,compand=attacks=0.08:decays=0.25:points=-80/-900|-45/-15|-27/-9|0/-7,"
            "loudnorm=I=-14:TP=-1:LRA=9",
            str(dst),
        ],
        check=True,
        capture_output=True,
    )


async def make_voiceover() -> tuple[Path, list[float]]:
    import edge_tts

    OUT.mkdir(parents=True, exist_ok=True)
    polished_parts: list[Path] = []
    durations: list[float] = []

    for i, scene in enumerate(SCENES):
        raw = OUT / f"vo-{i}-raw.mp3"
        clean = OUT / f"vo-{i}.mp3"
        communicate = edge_tts.Communicate(
            scene["vo"],
            VOICE,
            rate=VO_RATE,
            pitch=VO_PITCH,
        )
        await communicate.save(str(raw))
        polish_voice(raw, clean)
        polished_parts.append(clean)
        durations.append(probe_duration(clean) + SCENE_PAD)

    list_file = OUT / "vo-list.txt"
    list_file.write_text(
        "\n".join(f"file '{p.as_posix()}'" for p in polished_parts),
        encoding="utf-8",
    )
    vo_full = OUT / "voiceover.mp3"
    subprocess.run(
        ["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(list_file), "-c", "copy", str(vo_full)],
        check=True,
        capture_output=True,
    )
    total = probe_duration(vo_full)
    print(f"VO length {total:.1f}s (natural pace, no speed-up)")
    return vo_full, durations


def scene_clip(image: Path, duration: float, index: int) -> Path:
    clip = OUT / f"clip-{index}.mp4"
    frames = max(int(duration * 30), 1)
    vf = (
        "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,"
        f"zoompan=z='min(zoom+0.0012,1.06)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':"
        f"d={frames}:s=1080x1920:fps=30"
    )
    subprocess.run(
        [
            "ffmpeg", "-y", "-loop", "1", "-i", str(image),
            "-vf", vf, "-t", str(duration),
            "-c:v", "libx264", "-pix_fmt", "yuv420p", "-an", str(clip),
        ],
        check=True,
        capture_output=True,
    )
    return clip


def concat_clips(clips: list[Path]) -> Path:
    silent = OUT / "silent.mp4"
    lst = OUT / "clips.txt"
    lst.write_text("\n".join(f"file '{c.as_posix()}'" for c in clips), encoding="utf-8")
    subprocess.run(
        [
            "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(lst),
            "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo",
            "-c:v", "libx264", "-pix_fmt", "yuv420p",
            "-c:a", "aac", "-shortest",
            str(silent),
        ],
        check=True,
        capture_output=True,
    )
    return silent


def mix_audio(video: Path, vo: Path) -> Path:
    final = OUT / "sahra-vip-reel.mp4"
    subprocess.run(
        [
            "ffmpeg", "-y",
            "-i", str(video),
            "-i", str(vo),
            "-map", "0:v",
            "-map", "1:a",
            "-c:v", "libx264", "-pix_fmt", "yuv420p",
            "-c:a", "aac", "-b:a", "192k",
            "-shortest",
            str(final),
        ],
        check=True,
        capture_output=True,
    )
    return final


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    frames: list[Path] = []

    for i, scene in enumerate(SCENES):
        src = ASSETS / scene["image"]
        dst = OUT / f"frame-{i}.jpg"
        prepare_frame(src, dst)
        frames.append(dst)

    print("Generating voiceover…")
    vo, durations = asyncio.run(make_voiceover())
    print(f"Scene durations: {[round(d, 2) for d in durations]}")

    print("Rendering clips…")
    clips = [scene_clip(frames[i], durations[i], i) for i in range(len(SCENES))]
    silent = concat_clips(clips)

    print("Mixing audio…")
    final = mix_audio(silent, vo)
    print(f"Done: {final}")


if __name__ == "__main__":
    main()
