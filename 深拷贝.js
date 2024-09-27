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
// 使用示例
const original = { a: 1, b: { c: 2, d: [1, 2, { e: 3 }] } };
const copy = cloneDeep(original);
copy.b.d[2].e = 4;
console.log(original.b.d[2].e); // 输出: 3
console.log(copy.b.d[2].e); // 输出: 4
