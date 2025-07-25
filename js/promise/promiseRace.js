
function customPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    // if (!Array.isArray(promises)) {
    //   return reject(new TypeError("Arguments must be an array"));
    // }
    // 遍历 promises 数组
    for (let promise of promises) {
      // 确保每个元素都是 Promise 对象
      Promise.resolve(promise)
        .then((result) => {
          // 只要有一个 Promise 完成，就将其结果 resolve
          resolve(result);
        })
        .catch((error) => {
          // 如果有一个 Promise 被拒绝，就将其错误 reject
          reject(error);
        });
    }
  });
}