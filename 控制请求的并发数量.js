function concurRequest(urls, maxNum) {
  if (urls.length === 0) {
    return Promise.resolve([]);
  }
  return new Promise((resolve) => {
    let index = 0;
    const result = [];
    let count = 0;
    async function request() {
      const i = index;
      const url = urls[index];
      index++;
      try {
        const res = await fetch(url);
        result[i] = res;
      } catch (err) {
        result[i] = err;
      } finally {
        count++;
        if (count == urls.length) {
          resolve(result);
        }
        if (index < urls.length) {
          request();
        }
      }
    }
    for (let i = 0; i < maxNum; i++) {
      request();
    }
  });
}

class SuperTask {
  constructor(parallelCount = 2) {
    this.parallelCount = parallelCount;
    this.tasks = [];
    this.runningCount = 0;
  }
  add(task) {
    return new Promise((resolve, reject) => {
      this.tasks.push({ task, resolve, reject });
      this._run();
    });
  }
  _run() {
    while (this.runningCount <= this.parallelCount && this.tasks.length) {
      const { task, resolve, reject } = tasks.shift();
      this.runningCount++;
      Promise.resolve(task())
        .then(resolve, reject)
        .finally(() => {
          this.runningCount--;
          _run();
        });
    }
  }
}
