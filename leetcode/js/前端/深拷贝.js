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


function cloneDeep(value, map = new WeakMap()) {
  // 1. 基本类型或 null
  if (value === null || typeof value !== "object") {
    return value;
  }
  // 2. 处理循环引用
  if (map.has(value)) {
    return map.get(value);
  }
  // 3. 获取对象准确类型
  const type = Object.prototype.toString.call(value);
  let result;
  // 4. 根据类型初始化结果
  switch (type) {
    // 数组
    case "[object Array]":
      result = [];
      break;
    // 日期
    case "[object Date]":
      result = new Date(value);
      break;
    // 正则表达式
    case "[object RegExp]":
      result = new RegExp(value.source, value.flags);
      // 或者更完整地复制 lastIndex
      result.lastIndex = value.lastIndex;
      break;
    // Set
    case "[object Set]":
      result = new Set();
      break;
    // Map
    case "[object Map]":
      result = new Map();
      break;
    // 其他对象（普通对象、Error 等）
    default:
      // 检查是否是 Error 类型
      if (value instanceof Error) {
        result = Object.create(value.constructor.prototype);
        result.name = value.name;
        result.message = value.message;
        result.stack = value.stack; // 可选：是否拷贝 stack
      } else {
        // 普通对象
        result = Object.create(Object.getPrototypeOf(value)); // 保留原型
      }
  }
  // 5. 记录到 WeakMap，防止循环引用
  map.set(value, result);
  // 6. 处理 Set
  if (type === "[object Set]") {
    for (const item of value) {
      result.add(cloneDeep(item, map));
    }
  }
  // 7. 处理 Map
  else if (type === "[object Map]") {
    for (const [key, val] of value) {
      result.set(cloneDeep(key, map), cloneDeep(val, map));
    }
  }
  // 8. 处理数组/普通对象/Error
  else {
    const keys = Object.keys(value); // 所有可枚举自有属性
    const symbols = Object.getOwnPropertySymbols
      ? Object.getOwnPropertySymbols(value).filter(sym => value.propertyIsEnumerable(sym))
      : [];
    // 拷贝普通键
    for (const key of keys) {
      result[key] = cloneDeep(value[key], map);
    }
    // 拷贝 Symbol 键（如果支持）
    for (const sym of symbols) {
      result[sym] = cloneDeep(value[sym], map);
    }
  }
  return result;
}