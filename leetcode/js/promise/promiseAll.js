function customPromiseAll(promises) {
  if (!Array.isArray(promises)) {
    return Promise.reject(new TypeError("Arguments must be an array"));
  }
  if (promises.length === 0) {
    return Promise.resolve([]);
  }
  return new Promise((resolve, reject) => {
    const results = new Array(promises.length);
    let remaining = promises.length;
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          if (--remaining === 0) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}
