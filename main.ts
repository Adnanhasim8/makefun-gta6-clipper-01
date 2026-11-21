// main.ts — entrypoint for the gta6-clipper-01 entry.
//
// What this script does: it takes VIDEO.json from the repository root —
// the file that names the published GTA 6 clip on YouTube — and copies it
// into the output directory the grader provides, so the grader can read
// the video's address from there. Before copying, it checks that the URL
// inside VIDEO.json is a well-formed YouTube Shorts address over HTTPS,
// and after copying it compares the copied bytes with the original so a
// truncated or corrupted copy is caught instead of silently passed on.
//
// Usage:
//   MAKEFUN_OUTPUT_DIR=out node main.ts
// (or pass the output directory as the first argument.)
// The script exits non-zero and prints an error if anything is wrong.

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve the repository root from this script's own location, not from
// the working directory: the grader runs `node /bot/main.ts` from a
// directory that is not the repository, so process.cwd() would point at
// the wrong place and VIDEO.json would not be found.
const REPO_ROOT = dirname(fileURLToPath(import.meta.url));
const SOURCE = join(REPO_ROOT, "VIDEO.json");

const outputDir = process.argv[2] ?? process.env.MAKEFUN_OUTPUT_DIR ?? "out";
const target = join(outputDir, "VIDEO.json");

if (!existsSync(SOURCE)) {
  console.error(`error: ${SOURCE} not found`);
  process.exit(1);
}

const raw = readFileSync(SOURCE, "utf8");

let parsed: unknown;
try {
  parsed = JSON.parse(raw);
} catch {
  console.error("error: VIDEO.json is not valid JSON");
  process.exit(1);
}

if (
  typeof parsed !== "object" ||
  parsed === null ||
  typeof (parsed as { url?: unknown }).url !== "string"
) {
  console.error('error: VIDEO.json must be a JSON object with a string "url" field');
  process.exit(1);
}

const url = (parsed as { url: string }).url;

// The entry's video is a YouTube Short, shared as an https link:
// https://youtube.com/shorts/<11-character video id>
// Two layers of validation: the URL must parse and point at a YouTube
// host over HTTPS, and its path must be exactly /shorts/<id> with an id
// of 11 letters, digits, _ or -. A query string or fragment is rejected
// too, so the address handed in is exactly the address YouTube shares.
let parsedUrl: URL;
try {
  parsedUrl = new URL(url);
} catch {
  console.error(`error: url does not parse as a URL: ${url}`);
  process.exit(1);
}

const hostOk =
  parsedUrl.protocol === "https:" &&
  ["youtube.com", "www.youtube.com", "m.youtube.com"].includes(parsedUrl.hostname);
const pathOk = /^\/shorts\/[A-Za-z0-9_-]{11}$/.test(parsedUrl.pathname);
const noExtras = parsedUrl.search === "" && parsedUrl.hash === "";
if (!hostOk || !pathOk || !noExtras) {
  console.error(`error: url is not a well-formed https YouTube Shorts URL: ${url}`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(SOURCE, target);

// Verify the copy byte-for-byte so a partial write cannot slip through,
// and confirm the copied file's size matches the original as well.
const copied = readFileSync(target, "utf8");
if (copied !== raw || statSync(target).size !== statSync(SOURCE).size) {
  console.error("error: copied VIDEO.json does not match the original");
  process.exit(1);
}

console.log(`copied VIDEO.json to ${target} (${url})`);
