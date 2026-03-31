import SAMPLE_DATA from "./data/sample.js";
import { writeToFile, outputLine } from "./utils.js";
import { OUTPUT_DIR } from "./config.js";

// Sample data:
// "(id, name, email, type(id, name, customFields(c1, c2, c3)), externalId)"

/**
 * First part of the puzzle is to parse the sample data
 * and output the fields in order they appear.  Output should
 * take into account nested fields
 *
 * General notes:
 * - Paired paraentheses are used to indicate field nesting level.
 * - Fields are separated by commas.
 * - Fields can be nested to any depth.
 *
 * Assumptions based on the puzzle prompt:
 * - I can assume that the sample data is valid and well-formed. aka I don't need to write validation logic to check for invalid string values.
 **/

// Part 1:
function parseInputString(input: string): string {
  // The most straightforward brute force way to approach the first output of this puzzle is to
  // just iterate through each character in the input string and output the fields in order they appear.

  // Track the current field level based on open parentheses
  let fieldLevel = 0;

  // Track the current field name based on characters before the , or ( which indicate the potential end of a field name
  let fieldName = "";

  // Construct the output string as we iterate through the input string
  let output = "";

  for (const char of input) {
    if (char === "(") {
      output += outputLine(fieldLevel, fieldName);
      fieldLevel++;
      fieldName = "";
      continue;
    } else if (char === ")") {
      output += outputLine(fieldLevel, fieldName);
      fieldLevel--;
      fieldName = "";
      continue;
    } else if (char === ",") {
      output += outputLine(fieldLevel, fieldName);
      fieldName = "";
      continue;
    } else if (char === " ") {
      continue;
    } else {
      fieldName += char;
    }
  }
  return output;
}

writeToFile(`${OUTPUT_DIR}/output-1.txt`, parseInputString(SAMPLE_DATA));
console.log(parseInputString(SAMPLE_DATA));
