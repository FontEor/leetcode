var largestRectangleArea = function (heights) {
  let maxCount = 0;
  // 找到每一个元素左边第一个比当前元素小的索引位置
  const leftArr = Array.from({ length: heights.length }, () => -1);
  for (let i = 1; i < heights.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (heights[i] > heights[j]) {
        leftArr[i] = j;
        break;
      }
    }
  }
  // 找到每一个元素右边第一个比当前元素小的索引位置
  const rightArr = Array.from({ length: heights.length }, () => heights.length);
  for (let i = 0; i < heights.length - 1; i++) {
    for (let j = i + 1; j < heights.length; j++) {
      if (heights[i] > heights[j]) {
        rightArr[i] = j;
        break;
      }
    }
  }
  for (let i = 0; i < heights.length; i++) {
    const area = (rightArr[i] - leftArr[i] - 1) * heights[i];
    maxCount = Math.max(area, maxCount);
  }
  return maxCount;
};
console.log(largestRectangleArea([2, 1, 5, 6, 2, 3]));
