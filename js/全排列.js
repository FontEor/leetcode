var permute = function (nums) {
  const result = [];
  const path = [];
  function backTracking(nums, used) {
    if (path.length == nums.length) {
      result.push(Array.from(path));
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i] == 1) {
        continue;
      }
      path.push(nums[i]);
      used[i] = 1;
      backTracking(nums, used);
      path.pop();
      used[i] = 0;
    }
  }
  backTracking(nums, []);
  return result;
};
