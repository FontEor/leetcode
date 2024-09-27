function get(obj, path, defaultValue) {
  if (obj == null) {
    return defaultValue;
  }
  // 处理路径为字符串的情况
  if (typeof path === "string") {
    path = path.replace(/\[(\w+)\]/g, ".$1").split(".");
  }
  // 如果路径不是数组，返回默认值
  if (!Array.isArray(path)) {
    return defaultValue;
  }
  let result = obj;
  for (let i = 0; i < path.length; i++) {
    if (result == null) {
      return defaultValue;
    }
    result = result[path[i]];
  }
  return result === undefined ? defaultValue : result;
}

// 示例用法
const data = {
  a: {
    b: {
      c: 1,
    },
  },
};

console.log(get(data, "a.b.c")); // 输出: 1
console.log(get(data, "a.b.d", "default")); // 输出: 'default'
console.log(get(data, ["a", "b", "c"])); // 输出: 1
console.log(get(data, "a.b.c.d", "default")); // 输出: 'default'
console.log(get(data, "a.b[0]", "default")); // 处理带方括号的路径
