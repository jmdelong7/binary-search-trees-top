const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

class Node {
  constructor(data = null) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }

  insert(root, value) {
    if (value < root.data && root.left === null) {
      root.left = new Node(value);
      return;
    } else if (value > root.data && root.right === null) {
      root.right = new Node(value);
      return;
    }

    if (value < root.data) return this.insert(root.left, value);
    if (value > root.data) return this.insert(root.right, value);
  }

  delete(root, value) {
    if (root === null) return;

    if (root.left !== null) {
      value === root.left.data ? (root.left = null) : null;
    }

    if (root.right !== null) {
      value === root.right.data ? (root.right = null) : null;
    }

    if (value < root.data) return this.delete(root.left, value);
    if (value > root.data) return this.delete(root.right, value);
  }
}

function buildTree(array, start = 0, end = array.length - 1) {
  if (start > end) return null;
  const mid = Math.floor((start + end) / 2); // index = 5, value = 8
  const root = new Node(array[mid]);

  root.left = buildTree(array, start, mid - 1);
  root.right = buildTree(array, mid + 1, end);

  return root;
}

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]; // 14
array = [...new Set(array)].sort((a, b) => a - b); // 11
// [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]
const tree = new Tree(array);
tree.insert(tree.root, 44);
tree.insert(tree.root, 17);
tree.insert(tree.root, 16);
tree.insert(tree.root, 17);
tree.insert(tree.root, 10);
tree.insert(tree.root, -1);
tree.delete(tree.root, 44);
prettyPrint(tree.root);
