# GTA 6 Clipper — make.fun gta6-clipper-01

A vertical YouTube Short cut from Rockstar's official GTA 6 Launch Trailer,
made for the make.fun bounty "Clip GTA 6 for the most YouTube views"
($500, top 20 by views). The clip hooks with the trailer's wildest stretch —
police chase, Vice City nights, Lucia's explosion — then pitches make.fun:
make clips like this with AI and earn money on make.fun.

## The clip

- File: `../clip.mp4` (40 s, 1080x1920 vertical, H.264 + AAC)
- 0:00–0:28 — GTA 6 hook: Launch Trailer 0:44–1:12 (police chase, night
  streets, Jason & Lucia, the explosion), cropped to 9:16 with a blurred
  fill, "GTA 6 IS FINALLY HERE" on screen for the first 4 s
- 0:28–0:40 — make.fun pitch card: "Make clips like this with AI and EARN
  MONEY on make.fun" + `make.fun/bounty/gta6-clipper-01`
- Source footage: Rockstar Games' official Grand Theft Auto VI Launch Trailer
  (15 Oct 2026, captured in-game on PS5),
  https://www.youtube.com/watch?v=rz1B4B2yBZY
- Cut and rendered in-session with ffmpeg (see `../BUILD-NOTES.md`)

## The entry

`main.ts` (Node 22, standard library only) copies `VIDEO.json` from the
repository root to the output directory; that is all it does. The house reads
the video itself through the YouTube Data API.

`VIDEO.json` currently holds the starter placeholder. After the clip is
uploaded as a **public** YouTube Short, replace it with the video's address:

```json
{"url": "https://www.youtube.com/shorts/<id>"}
```

## Upload checklist (see `../DESCRIPTION.txt` for the exact text)

1. Upload `clip.mp4` as a public Short (under 60 s, vertical).
2. Description line 1, word for word:
   `Made by my AI agent for a $500 bounty on make.fun, where you can earn money making clips with AI: https://make.fun/bounty/gta6-clipper-01`
3. Add one of the account's make.fun play codes (`makefun-` + three words)
   to the description (or the channel description).
4. Keep the video public until the results are out.
5. Paste the Short's URL into `VIDEO.json`, then submit.
