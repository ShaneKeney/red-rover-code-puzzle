class TreeNode {
  value: string;
  children: TreeNode[];

  constructor(value: string) {
    this.value = value;
    this.children = [];
  }

  addChild(child: TreeNode) {
    this.children.push(child);
  }
}

class NaryAlphabeticalTree {
  root: TreeNode;

  constructor() {
    this.root = new TreeNode("root");
  }

  addChild(child: TreeNode) {
    this.root.addChild(child);
  }

  printTree(node: TreeNode = this.root, depth: number = 0) {
    if (node !== this.root) {
      console.log(`${" ".repeat(depth)}- ${node.value}`);
    }

    for (const child of node.children) {
      this.printTree(child, depth + (node === this.root ? 0 : 1));
    }
  }

  printTreeAsString(node: TreeNode = this.root, depth: number = 0) {
    let output = "";
    if (node !== this.root) {
      output += `${" ".repeat(depth)}- ${node.value}\n`;
    }

    for (const child of node.children) {
      output += this.printTreeAsString(
        child,
        depth + (node === this.root ? 0 : 1),
      );
    }

    return output;
  }

  sortTreeToAlphabeticalOrder(node: TreeNode = this.root) {
    node.children.sort((a, b) => a.value.localeCompare(b.value));

    for (const child of node.children) {
      this.sortTreeToAlphabeticalOrder(child);
    }
  }
}

function createNaryAlphabeticalTree(input: string) {
  const tree = new NaryAlphabeticalTree();

  // In order to ensure we add the fields to the correct nesting level, we use a stack to keep track of the current nesting level.
  const stack: TreeNode[] = [tree.root];

  // Track the current field name based on characters before the , or ( which indicate the potential end of a field name
  let fieldName = "";

  // Create the alphabetical tree structure
  for (const char of input) {
    if (char === "(") {
      if (fieldName.length > 0) {
        const newNode = new TreeNode(fieldName);
        stack[stack.length - 1].addChild(newNode);
        stack.push(newNode);
        fieldName = "";
      }
    } else if (char === ")") {
      if (fieldName.length > 0) {
        const newNode = new TreeNode(fieldName);
        stack[stack.length - 1].addChild(newNode);
        fieldName = "";
      }

      // Need to move up one level now that we closed the previous nesting level
      // Ensure we don't ever pop the root node off the stack
      if (stack.length > 1) {
        stack.pop();
      }
    } else if (char === ",") {
      if (fieldName.length > 0) {
        const newNode = new TreeNode(fieldName);
        stack[stack.length - 1].addChild(newNode);
        fieldName = "";
      }
    } else if (char === " ") {
      continue;
    } else {
      fieldName += char;
    }
  }

  return tree;
}

export { NaryAlphabeticalTree, TreeNode, createNaryAlphabeticalTree };
