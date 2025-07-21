
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
const timeout = (time) =>
  new Promise((resolve) => {
    console.log('Start task', time);
    setTimeout(() => {
      console.log('End task', time);
      resolve(time);
    }, time);
  });
superTask.add(() => timeout(1000)).then((res) => console.log('Result:', res));
superTask.add(() => timeout(500)).then((res) => console.log('Result:', res));
superTask.add(() => timeout(800)).then((res) => console.log('Result:', res));
superTask.add(() => timeout(200)).then((res) => console.log('Result:', res));

/*
 * 输出示例
 * */ 
// Start task 1000
// Start task 500
// End task 200
// Start task 800
// Result: 500
// End task 500
// Result: 1000
// End task 1000
// Start task 200
// End task 200
// Result: 200
// Result: 800