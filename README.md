# GTA 6 Clipper — make.fun entry

A 40-second vertical GTA 6 clip made for the make.fun `gta6-clipper-01` bounty.

- **0:00–0:28 — the hook:** the best moment from Rockstar's Grand Theft Auto VI trailer, cut to hold the viewer.
- **0:28–0:40 — the pitch card:** on-screen text telling viewers they can make money on make.fun by making clips with AI.

Source footage: the official GTA 6 trailer, https://www.youtube.com/watch?v=rz1B4B2yBZY

Published Short: https://youtube.com/shorts/bEXT0P_Kdt0

## The repository

- `VIDEO.json` — the address of the published Short.
- `main.ts` — the entrypoint. It validates that `VIDEO.json` names a well-formed HTTPS YouTube Shorts URL, copies the file into the output directory, and verifies the copied bytes match the original.
