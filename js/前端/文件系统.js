class FileSystem {
  constructor() {
    this.root = {}; // 根目录
  }
  /**
   * 创建路径并赋值
   * @param {string} path - 如 "/a/b/c"
   * @param {number} value - 文件内容
   * @returns {boolean}
   */
  createPath(path, value) {
    if (!path || path === "/" || !path.startsWith("/")) {
      return false;
    }
    const parts = path.split("/").filter(Boolean); // 去掉空字符串
    if (parts.length === 0) return false;
    let current = this.root;
    // 遍历除最后一级外的所有目录
    for (let i = 0; i < parts.length - 1; i++) {
      const dir = parts[i];
      if (!current[dir] || current[dir].$value !== undefined) {
        // 父路径不存在，或父路径是个文件（不能作为目录）
        return false;
      }
      current = current[dir];
    }
    const lastPart = parts[parts.length - 1];
    // 最后一级路径已存在（无论是文件还是目录），都不能再创建
    if (current[lastPart] !== undefined) {
      return false;
    }
    // 创建文件（带 $value）
    current[lastPart] = { $value: value };
    return true;
  }

  /**
   * 获取路径的值
   * @param {string} path
   * @returns {number}
   */
  get(path) {
    if (!path || path === "/" || !path.startsWith("/")) {
      return -1;
    }
    const parts = path.split("/").filter(Boolean);
    let current = this.root;
    for (const part of parts) {
      if (!current[part]) {
        return -1; // 路径不存在
      }
      current = current[part];
    }
    // 必须是文件（有 $value）才返回值
    return current.$value !== undefined ? current.$value : -1;
  }
}
