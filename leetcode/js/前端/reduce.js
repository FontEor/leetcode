function myReduce(arr, callback, initialValue) {
  // 参数校验
  if (!Array.isArray(arr)) {
    throw new TypeError("myReduce is not a function");
  }
  if (typeof callback !== "function") {
    throw new TypeError("callback must be a function");
  }

  const len = arr.length;
  let hasInitialValue = arguments.length > 2; // 检查是否传了 initialValue
  let accumulator;
  let startIndex;

  // 处理空数组情况
  if (len === 0) {
    if (!hasInitialValue) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    return initialValue;
  }

  // 确定初始值和起始索引
  if (hasInitialValue) {
    accumulator = initialValue;
    startIndex = 0;
  } else {
    // 找到第一个存在的元素作为初始值（跳过稀疏项）
    let found = false;
    for (let i = 0; i < len; i++) {
      if (i in arr) {
        accumulator = arr[i];
        startIndex = i + 1;
        found = true;
        break;
      }
    }
    if (!found) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
  }

  // 遍历并执行回调
  for (let i = startIndex; i < len; i++) {
    if (i in arr) {
      // 处理稀疏数组
      accumulator = callback(accumulator, arr[i], i, arr);
    }
  }

  return accumulator;
}