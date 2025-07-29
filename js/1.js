function cloneDeep(value, map = new WeakMap()) {
  if (value === null || typeof value !== "object") {
    // 如果是基本数据类型，直接返回
    return value;
  }
  // 处理循环引用
  if (map.has(value)) {
    return map.get(value);
  }
  // 创建目标对象或数组
  const result = Array.isArray(value) ? [] : {};
  map.set(value, result);
  // 递归拷贝对象的每个属性
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      result[key] = cloneDeep(value[key], map);
    }
  }
  return result;
}
