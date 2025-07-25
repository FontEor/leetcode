class MyPromise {
  constructor(executor) {
    this.state = "pending"; // 其他状态：'fulfilled' 或 'rejected'
    this.value = undefined; // fulfilled 时的值
    this.reason = undefined; // rejected 时的原因
    this.onFulfilledCallbacks = []; // 存储所有成功的回调
    this.onRejectedCallbacks = []; // 存储所有失败的回调
    // resolve 方法
    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((callback) => callback(value));
      }
    };
    // reject 方法
    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach((callback) => callback(reason));
      }
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  // then 方法
  then(onFulfilled, onRejected) {
    // 默认的 onFulfilled 和 onRejected 函数，如果未提供则直接传递值
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (r) => {
            throw r;
          };
    return new MyPromise((resolve, reject) => {
      const handleCallback = (callback, value) => {
        try {
          const result = callback(value);
          if (result instanceof MyPromise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (e) {
          reject(e);
        }
      };
      if (this.state === "fulfilled") {
        handleCallback(onFulfilled, this.value);
      } else if (this.state === "rejected") {
        handleCallback(onRejected, this.reason);
      } else {
        this.onFulfilledCallbacks.push(() =>
          handleCallback(onFulfilled, this.value)
        );
        this.onRejectedCallbacks.push(() =>
          handleCallback(onRejected, this.reason)
        );
      }
    });
  }
  // catch 方法
  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

// 使用示例
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve("成功!"), 1000);
});

promise
  .then((value) => {
    console.log(value); // 输出: 成功!
    return "继续成功";
  })
  .then((value) => {
    console.log(value); // 输出: 继续成功
  })
  .catch((error) => {
    console.error("错误:", error);
  });
