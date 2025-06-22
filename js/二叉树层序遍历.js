function bfs(root) {
  let result = [];
  let queue = [];
  if (!root) return null;
  queue.push(root);
  while (!queue.length) {
    let temp = [];
    let size = queue.length;
    while (size--) {
      let node = queue.shift();
      temp.push(node.val);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    result.push(temp);
  }
  return result;
}
