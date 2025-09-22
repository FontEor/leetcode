const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MyPromise {
  #state = "pending"; // 'pending', 'fulfilled', 'rejected'
  #result = undefined;
  #thenables = [];
  constructor(executor) {
    const resolve = (data) => {
      if (this.#state !== "pending") return;
      // 展开 thenable 值（如原生 Promise）
      if (
        data instanceof MyPromise ||
        (data && typeof data.then === "function")
      ) {
        return data.then(resolve, reject);
      }
      this.#state = "fulfilled";
      this.#result = data;
      this.#run();
    };
    const reject = (err) => {
      if (this.#state !== "pending") return;
      this.#state = "rejected";
      this.#result = err;
      this.#run();
    };
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#thenables.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      });
      this.#run();
    });
  }
  #run() {
    if (this.#state === "pending") return;
    while (this.#thenables.length) {
      const { onFulfilled, onRejected, resolve, reject } =
        this.#thenables.shift();
      if (this.#state === "fulfilled") {
        this.#handleCallback(onFulfilled, resolve, reject);
      } else {
        this.#handleCallback(onRejected, resolve, reject);
      }
    }
  }
  #handleCallback(callback, resolve, reject) {
    if (typeof callback !== "function") {
      // 值穿透或错误穿透
      queueMicrotask(() => {
        const settled = this.#state === "fulfilled" ? resolve : reject;
        settled(this.#result);
      });
      return;
    }
    queueMicrotask(() => {
      try {
        const data = callback(this.#result);
        // 如果返回值是 Promise，则继续展开
        if (
          data instanceof MyPromise ||
          (data && typeof data.then === "function")
        ) {
          data.then(resolve, reject);
        } else {
          resolve(data);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  // 静态方法：Promise.resolve
  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      if (
        value instanceof MyPromise ||
        (value && typeof value.then === "function")
      ) {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  }

  // 静态方法：Promise.reject
  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }

  // finally 方法（可选）
  finally(callback) {
    return this.then(
      (value) => {
        return MyPromise.resolve(callback()).then(() => value);
      },
      (reason) => {
        return MyPromise.resolve(callback()).then(() => {
          throw reason;
        });
      }
    );
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
