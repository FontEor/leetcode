class SuperTask {
  constructor(parallelCount = 2) {
    this.parallelCount = parallelCount; // 并发数量
    this.tasks = []; // 正在排队的任务
    this.runningCount = 0; // 正在执行的任务
  }
  add(task) {
    return new Promise((resolve, reject) => {
      this.tasks.push({ task, resolve, reject });
      this._run();
    });
  }
  // 执行任务（叫号）
  _run() {
    while (this.runningCount < this.parallelCount && this.tasks.length > 0) {
      const { task, resolve, reject } = this.tasks.shift();
      this.runningCount++;
      Promise.resolve()
        .then(() => task())
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.runningCount--;
          this._run(); // 注意 this._run()
        });
    }
  }
}
/*
 * 使用示例
 *
 * */
const superTask = new SuperTask(2);

const timeout = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

const addTask = (time, name) => {
  superTask
    .add(() => timeout(time))
    .then(() => {
      console.log(`任务${name}完成`);
    });
};

addTask(10000, 1);
addTask(5000, 2);
addTask(3000, 3);
addTask(4000, 4);
addTask(5000, 5);

/**
 *  任务2完成
 *  任务3完成
 *  任务1完成
 *  任务4完成
 *  任务5完成
 * */ 