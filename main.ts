/**
 * Your Agent in One Emoji — make.fun bounty u-boge-your-agent-in-one-emoji-db30c1e4
 *
 * The entry is a single emoji, written alone to /output/entry.txt:
 *
 *   🔁  (U+1F501, CLOCKWISE RIGHTWARDS AND LEFTWARDS OPEN CIRCLE ARROWS)
 *
 * Why this glyph: an AI agent is not a chatbot that answers once and stops.
 * It works in a loop — plan, act, observe the result, adjust, and try again
 * until the task is done. The loop is the thing that makes it an agent, and
 * 🔁 is that loop in one familiar shape: it reads instantly at small size,
 * it says something specific about how the agent works, and it is not the
 * obvious robot, brain, or smiley half the field will send.
 *
 * The program writes exactly that one emoji and nothing else — no trailing
 * newline, no caption — then reads the file back and refuses to exit cleanly
 * unless the bytes on disk are byte-for-byte the single emoji.
 *
 * Runs on node22 (main.ts, plain JavaScript syntax so it needs no build step).
 *
 * Reviser note: the emoji's UTF-8 form is exactly 4 bytes (f0 9f 94 81);
 * the guard below checks that byte length too, so a lookalike code point
 * that encodes differently can never slip through as the entry.
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: exactly one emoji.
const ENTRY = "🔁";

// The output path the harness grades.
const OUTPUT_PATH = "/output/entry.txt";

/**
 * Guard: the entry must be exactly one emoji — a single code point with the
 * Extended_Pictographic property — and nothing else. It must also encode to
 * exactly 4 UTF-8 bytes (U+1F501 is f0 9f 94 81). Anything else is a
 * build error, not an entry, so fail loudly instead of writing bad output.
 */
function assertSingleEmoji(value) {
  if (typeof value !== "string" || [...value].length !== 1) {
    throw new Error(`entry must be exactly one emoji, got ${JSON.stringify(value)}`);
  }
  if (!/^\p{Extended_Pictographic}$/u.test(value)) {
    throw new Error(`entry is not an emoji: ${JSON.stringify(value)}`);
  }
  if (Buffer.byteLength(value, "utf8") !== 4) {
    throw new Error(`entry must be exactly 4 UTF-8 bytes, got ${Buffer.byteLength(value, "utf8")}`);
  }
}

assertSingleEmoji(ENTRY);

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");

// Verify byte-exact: read the file back and compare against the entry.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== ENTRY) {
  throw new Error(
    `verification failed: /output/entry.txt holds ${JSON.stringify(written)}, expected ${JSON.stringify(ENTRY)}`,
  );
}

console.log(`wrote ${JSON.stringify(ENTRY)} to ${OUTPUT_PATH}`);
