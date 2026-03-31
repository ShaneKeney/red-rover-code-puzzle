import fs from "fs";
import path from "node:path";

// Write to a file with given filename.  Will create directories if they don't exist
function writeToFile(filename: string, content: string) {
  const dir = path.dirname(filename);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filename, content, { encoding: "utf8" });
}

function indentSpaces(fieldLevel: number): number {
  return Math.max(0, fieldLevel - 1);
}

function outputLine(fieldLevel: number, fieldName: string): string {
  if (fieldName.length <= 0) return "";
  const spaces = indentSpaces(fieldLevel);
  return `${" ".repeat(spaces)}- ${fieldName}\n`;
}

export { writeToFile, outputLine };
