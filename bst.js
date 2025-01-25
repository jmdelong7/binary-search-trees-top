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
  if (!root.left && !root.right) return null;

  const { left, right } = root;

  if (left && left.data === value) {
    const l = left.left;
    const r = left.right;

    // Delete left node that has 2 children
    if (l && r) {
      let successor = r;
      while (successor.left) {
        successor = successor.left;
      }
      left.data = successor.data;
      left.right = deleteVal(r, successor.data);
      return root;
    }

    // Delete left node that has 1 child
    if (l && !r) return (root.left = l);
    if (!l && r) return (root.left = r);

    // Delete left node that is a leaf node
    return (root.left = null);
  }

  if (right && right.data === value) {
    const l = right.left;
    const r = right.right;

    // Delete right node that has 2 children
    if (l && r) {
      let successor = r;
      while (successor.left) {
        successor = successor.left;
      }
      right.data = successor.data;
      right.right = deleteVal(r, successor.data);
      return root;
    }

    // Delete right node that has 1 child
    if (l && !r) return (root.right = l);
    if (!l && r) return (root.right = r);

    // Delete right node that is a leaf node
    return (root.right = null);
  }

  if (value < root.data) {
    return deleteVal(root.left, value);
  } else if (value > root.data) {
    return deleteVal(root.right, value);
  }
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

function depth(root, node) {
  if (!root || !node) return -1;
  if (node.data < root.data) return depth(root.left, node);
  if (node.data > root.data) return depth(root.right, node);
}

let array = [
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 25, 84, 234, 113, 6345, 324, 313, 555,
  444,
]; // 14
const tree = new Tree(array);
deleteVal(tree.root, 6345);
deleteVal(tree.root, 324);
deleteVal(tree.root, 113);
deleteVal(tree.root, 5);

prettyPrint(tree.root);
