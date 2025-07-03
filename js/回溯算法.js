// function backtrack(路径, 选择列表) {
//     if (满足结束条件) {
//         结果.push(路径);
//         return;
//     }
//     for (选择 of 选择列表) {
//         做选择;
//         backtrack(路径, 选择列表);
//         撤销选择;
//     }
// }
const legalMatrix = (m, n, arr) => {
  const affected = [];
  const size = arr.length;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (i === m && j === n) continue;
      if (
        i === m || // 同一行
        j === n || // 同一列
        i - j === m - n || // 主对角线
        i + j === m + n // 副对角线
      ) {
        if (arr[i][j] === ".") {
          arr[i][j] = "X";
          affected.push([i, j]);
        }
      }
    }
  }
  return affected; // 返回这次设置的所有 "X" 的坐标，用于回退
};
var solveNQueens = function (n) {
  const result = [];
  const visited = Array.from({ length: n }, () => new Array(n).fill("."));
  const backtrack = (row) => {
    if (row === n) {
      const snapshot = visited.map((row) =>
        row.map((cell) => (cell === "Q" ? "Q" : ".")).join("")
      );
      result.push(snapshot);
      return;
    }
    for (let col = 0; col < n; col++) {
      if (visited[row][col] === ".") {
        visited[row][col] = "Q";
        // 标记可攻击区域，记录受影响位置
        const affected = legalMatrix(row, col, visited);
        // 进入下一行
        backtrack(row + 1);
        // 回退：撤销皇后 + 恢复受影响区域
        visited[row][col] = ".";
        for (const [x, y] of affected) {
          visited[x][y] = ".";
        }
      }
    }
  };
  backtrack(0);
  return result;
};
console.log(solveNQueens(4));
