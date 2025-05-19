var lengthOfLongestSubstring = function (nums, k) {
  if (nums.length < 2) return nums.length;
  let i = 0,
    childNum = nums[i],
    maxLen = 1;
  while (i < nums.length - 1) {
    let j = i + 1;
    while (j < nums.length) {
      if (childNum > k) {
        maxLen = maxLen < childNum.length ? childNum.length : maxLen;
        break;
      } else {
        childNum += nums[j];
        j++;
      }
    }
    if (j === nums.length) {
      maxLen = maxLen < childNum.length ? childNum.length : maxLen;
      break;
    }
    i++;
    childNum = nums[i];
  }
  return maxLen;
};

console.log(lengthOfLongestSubstring([1, 1, 1], 2));
