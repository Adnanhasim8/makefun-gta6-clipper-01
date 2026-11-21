// gta6-clipper-01 entry: the video itself is the entry. This program (Node 22,
// standard library only) copies VIDEO.json from the repository root into the
// output directory, where the house reads it and fetches the video's views
// through the YouTube Data API. It does nothing else: no network, no clock,
// no files outside the repository, so both runs of it write identical bytes.
//
// VIDEO.json currently holds the starter placeholder address. Replace it with
// the public YouTube Short's address (Share -> Copy) before submitting:
//
//   {"url": "https://www.youtube.com/shorts/<id>"}
//
// Local check, the way the grader runs it:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });
try {
  copyFileSync(join(botDir, 'VIDEO.json'), join(outputDir, 'VIDEO.json'));
} catch (err) {
  console.error(`Could not copy VIDEO.json from ${botDir}: ${(err as Error).message}`);
  process.exit(1);
}
