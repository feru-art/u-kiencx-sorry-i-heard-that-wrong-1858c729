// Entry for "Sorry, I Heard That Wrong".
// The program writes a single apology line to the output file the
// grader reads. The line is fixed, so every run is deterministic.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const heardWrongly = "don't call Mom";
const heardInstead = "do call Mom";
const consequence = "She's on speaker now, and she has questions.";

function buildApology(): string {
  const opening = `Sorry, I heard '${heardWrongly}' as '${heardInstead}'.`;
  return `${opening} ${consequence}`;
}

const CHARACTER_LIMIT = 140;

function countCharacters(line: string): number {
  // Spread iterates code points, which is how the gate counts characters.
  return [...line].length;
}

function checkLine(line: string): void {
  const characters = countCharacters(line);
  if (line.trim().length === 0) {
    throw new Error("apology line must not be blank");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("apology must stay on one line");
  }
  if (characters > CHARACTER_LIMIT) {
    throw new Error(
      `apology line is ${characters} characters, over the ${CHARACTER_LIMIT} limit`,
    );
  }
  const bytes = Buffer.byteLength(line, "utf8");
  if (bytes !== characters) {
    throw new Error("apology line must stay plain ASCII so bytes match characters");
  }
}

function main(): void {
  const target = process.argv[2] ?? "/output/entry.txt";
  const line = buildApology();
  checkLine(line);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, line, "utf8");
}

main();
