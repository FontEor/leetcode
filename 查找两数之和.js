function findPairsInDecreasingArray(arr, target) {
  let result = [];
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === target) {
      result.push([arr[left], arr[right]]);
      left++;
      right--;
    } else if (sum > target) {
      // 如果和大于目标值，右指针左移，寻找更小的数
      left++;
    } else {
      // 如果和小于目标值，左指针右移，寻找更大的数
      right--;
    }
  }
  return result;
}
