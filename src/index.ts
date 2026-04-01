import SAMPLE_DATA from "./data/sample.js";
import { writeToFile, outputLine } from "./utils.js";
import { OUTPUT_DIR } from "./config.js";
import {
  createNaryAlphabeticalTree
} from "./Tree/index.js";

// Sample data:
// "(id, name, email, type(id, name, customFields(c1, c2, c3)), externalId)"

// Part 1:
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
function parseInputStringInPlace(input: string): string {
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

writeToFile(`${OUTPUT_DIR}/output-1.txt`, parseInputStringInPlace(SAMPLE_DATA));
console.log(parseInputStringInPlace(SAMPLE_DATA));

// Part 2:
/**
 * The second part of the puzzle is to parse the sample data but instead of outputting the fields in order they appear,
 * we should output the fields in alphabetical order within the same nesting level.
 *
 * General notes:
 * - Same type of input string and implications as Part 1 above with the implication of alphabetical order within the same nesting level.
 * - Some data structure that stores the fields so that we can sort them alphabetically within the same nesting level.  Initially thinking
 *   of some type of tree data structure where the fields are the nodes and the nesting level is the depth of the tree.
 */
const tree = createNaryAlphabeticalTree(SAMPLE_DATA);
console.log("Tree before sorting:");
console.log("--------------------------------\n");
tree.printTree();

console.log("\n");
console.log("Tree after sorting:");
console.log("--------------------------------\n");

tree.sortTreeToAlphabeticalOrder();
tree.printTree();

console.log("\n");

writeToFile(`${OUTPUT_DIR}/output-2.txt`, tree.printTreeAsString());
