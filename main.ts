import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "At the parents' evening, her father, who never learned to read, signed her report card slowly, letter by letter, and did not ask for help.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });

const chars = [...LINE].length;
if (chars < 1 || chars > 240) {
  throw new Error(`line must be 1-240 characters, got ${chars}`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}
const bytes = Buffer.byteLength(LINE, "utf8");
if (bytes !== chars) {
  throw new Error(`line must be pure ASCII so bytes equal chars, got ${bytes} bytes vs ${chars} chars`);
}

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");
const readBack = readFileSync(outPath, "utf8");
if (readBack !== LINE) {
  throw new Error("read-back mismatch: entry.txt differs from the line");
}
