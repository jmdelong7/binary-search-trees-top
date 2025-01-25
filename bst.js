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
  if (callback === undefined) throw Error('callback is required.');
  const queue = [root];
  while (queue.length !== 0) {
    const node = queue.shift();
    const { left, right } = node;
    left !== null && queue.push(left);
    right !== null && queue.push(right);
    callback(node);
  }
}

function height(node) {
  if (!node) return -1;
  return Math.max(height(node.left), height(node.right)) + 1;
}

let array = [
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 25, 84, 234, 113, 6345, 324, 313, 555,
  444,
]; // 14
const tree = new Tree(array);
prettyPrint(tree.root);
console.log(tree.root.left.left.left);
console.log(height(tree.root.left.left.left));
