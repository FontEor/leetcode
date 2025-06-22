var restoreIpAddresses = function (s) {
  let arr = [];
  function dfs(res, start) {
    if (res.length == 4 && start == s.length) {
      arr.push(res.join("."));
      return;
    }
    if (res.length == 4 && start < s.length) {
      return;
    }
    for (let len = 1; len <= 3; len++) {
      if (start + len - 1 >= s.length) return;
      const str = s.substring(start, start + len);
      if (len == 3 && +str > 255) return;
      res.push(str);
      dfs(res, start + len);
      res.pop();
    }
  }
  dfs([], 0);
  return arr;
};
