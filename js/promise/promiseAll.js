function customPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Arguments must be an array"));
    }
    let results = [];
    let completedCount = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((result) => {
          results[index] = result;
          completedCount++;
          if (completedCount === promises.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error); // 如果有一个 Promise 失败，则整体失败
        });
    });
  });
}
