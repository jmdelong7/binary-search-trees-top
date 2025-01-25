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

function buildTree(array, start = 0, end = array.length - 1) {
  if (start > end) return null;
  const mid = Math.floor((start + end) / 2); // index = 5, value = 8
  const root = new Node(array[mid]);

  root.left = buildTree(array, start, mid - 1);
  root.right = buildTree(array, mid + 1, end);

  return root;
}

class Tree {
  constructor(array) {
    array = [...new Set(array)].sort((a, b) => a - b);
    this.root = buildTree(array);
  }
}

function insert(root, value) {
  if (value < root.data && root.left === null) {
    root.left = new Node(value);
    return;
  } else if (value > root.data && root.right === null) {
    root.right = new Node(value);
    return;
  }

  if (value < root.data) return insert(root.left, value);
  if (value > root.data) return insert(root.right, value);
}

function deleteVal(root, value) {
  if (!root) return null; // Base case: if root is null, nothing to delete

  if (value < root.data) {
    root.left = deleteVal(root.left, value); // Traverse left subtree
  } else if (value > root.data) {
    root.right = deleteVal(root.right, value); // Traverse right subtree
  } else {
    // Node to delete found
    if (!root.left) return root.right; // Case: 0 or 1 child (only right or none)
    if (!root.right) return root.left; // Case: 1 child (only left)

    function findMin(node) {
      while (node.left) node = node.left; // Traverse to the leftmost node
      return node; // Return the smallest node
    }

    // Case: 2 children
    let successor = findMin(root.right); // Find the in-order successor
    root.data = successor.data; // Replace value with successor's value
    root.right = deleteVal(root.right, successor.data); // Remove successor
  }

  return root; // Return the modified root
}

function find(root, value) {
  if (value === root.data) return root;
  if (root === null) return null;
  if (value < root.data) return find(root.left, value);
  if (value > root.data) return find(root.right, value);
}

function levelOrderRec(root, callback, arr = []) {
  if (callback === undefined) throw Error('callback is required.');
  if (root === null) return;
  const { left, right } = root;
  arr.push(left, right);
  callback(root);

  return levelOrderRec(arr.shift(), callback, arr);
}

function levelOrderItr(root, callback) {
  if (!callback) throw Error('callback is required.');
  const queue = [root];
  while (queue.length !== 0) {
    const node = queue.shift();
    const { left, right } = node;
    left !== null && queue.push(left);
    right !== null && queue.push(right);
    callback(node);
  }
}

function preOrder(root, callback) {
  if (!callback) throw Error('callback is required.');
  if (!root) return null;
  callback(root);
  preOrder(root.left, callback);
  preOrder(root.right, callback);
}

function inOrder(root, callback) {
  if (!callback) throw Error('callback is required.');
  if (!root) return null;
  inOrder(root.left, callback);
  callback(root);
  inOrder(root.right, callback);
}

function postOrder(root, callback) {
  if (!callback) throw Error('callback is required.');
  if (!root) return null;
  postOrder(root.left, callback);
  postOrder(root.right, callback);
  callback(root);
}

function height(node) {
  if (!node) return -1;
  return Math.max(height(node.left), height(node.right)) + 1;
}

function depth(root, node, count = 0) {
  if (root === node) return count;
  if (!root) return null;
  if (node.data < root.data) return depth(root.left, node, count + 1);
  if (node.data > root.data) return depth(root.right, node, count + 1);
}

function isBalanced(root) {
  if (!root) return true;

  const left = height(root.left);
  const right = height(root.right);

  if (Math.abs(left - right > 1)) return false;
  if (!isBalanced(root.left) || !isBalanced(root.right)) return false;

  return true;
}

let array = [
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 25, 84, 234, 113, 6345, 324, 313, 555,
  444,
]; // 14
const tree = new Tree(array);
deleteVal(tree.root, 5);
deleteVal(tree.root, 7);
deleteVal(tree.root, 3);
deleteVal(tree.root, 4);

prettyPrint(tree.root);
console.log(isBalanced(tree.root));
