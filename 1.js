class MyPromise {
  #state = "pending"; // 'pending', 'fulfilled', 'rejected'
  #result = undefined;
  #thenables = [];
  constructor(executor) {
    const resolve = (data) => {
      if (this.#state !== "pending") return;
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
  #handleCallback(callback, resolve, reject) {
    if (typeof callback !== "function") {
      // 状态穿透
      queueMicrotask(() => {
        const settled = this.#state === "fulfilled" ? resolve : reject;
        settled(this.#result);
      });
      return;
    }
    queueMicrotask(() => {
      try {
        const data = callback(this.#result);
        resolve(data);
      } catch (err) {
        reject(err);
      }
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
} 