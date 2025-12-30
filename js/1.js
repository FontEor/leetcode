/**
  给定一个无重复元素的数组arr，和一个目标值sum，找出所有和为sum的组合（数组项可重复使用，不同排序需要去重）
  如arr为[2,3,4]，目标值sum为6，解为 [[2,2,2],[2,4],[3,3]]
  如arr为[2,3,6,7]，目标值sum为7，解为 [[7], [2,2,3]]
**/
function combinationSum(arr, sum) {
  const result = [];
  const path = [];
  // 排序（可选，但有助于剪枝）
  arr.sort((a, b) => a - b);
  function backtrack(startIndex, currentSum) {
    // 找到目标组合
    if (currentSum === sum) {
      result.push([...path]); // 深拷贝
      return;
    }
    // 剪枝：如果当前和已经超过目标，直接返回
    if (currentSum > sum) {
      return;
    }
    // 从 startIndex 开始遍历，避免重复组合
    for (let i = startIndex; i < arr.length; i++) {
      // 可选剪枝：如果加上当前数就超了，后面的更大，可以直接 break（因为已排序）
      if (currentSum + arr[i] > sum) {
        break;
      }
      path.push(arr[i]);
      backtrack(i, currentSum + arr[i]); // 注意：传 i（不是 i+1），因为可以重复使用
      path.pop(); // 回溯
    }
  }
  backtrack(0, 0);
  return result;
}
