var canPartition = function (nums) {
  const totalSum = nums.reduce((sum, num) => sum + num, 0);
  // 如果总和为奇数，不可能平分
  if (totalSum % 2 !== 0) return false;
  const target = totalSum / 2;
  const n = nums.length;
  // 初始化DP数组，dp[i]表示能否组成和为i的子集
  const dp = new Array(target + 1).fill(false);
  dp[0] = true; // 和为0的子集总是存在（空集）
  for (const num of nums) {
    // 从后向前遍历，避免重复使用同一个元素
    for (let i = target; i >= num; i--) {
      dp[i] = dp[i] || dp[i - num];
    }
    // 提前结束，如果已经找到解
    if (dp[target]) return true;
  }
  return dp[target];
};
console.log(canPartition([1, 5, 11, 5]));
