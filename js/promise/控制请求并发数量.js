// currentIndex 的作用是：
// 保存当前请求的静态索引，避免异步回调时因 index 变化导致结果存储错位。
// 通过闭包隔离每个请求的上下文，确保结果数组 result 的顺序与原始 urls 顺序一致。
function concurRequest(urls, maxNum) {
  return new Promise((resolve, reject) => {
    if (urls.length === 0) return resolve([]);
    let index = 0;          // 当前要发起请求的索引
    let finishCount = 0;    // 已完成的请求数
    const result = [];      // 存储结果
    function request() {
      if (index >= urls.length) return; // 没有更多任务
      const currentIndex = index;
      const url = urls[index++];
      // 发起请求
      fetch(url)
        .then(res => {
          result[currentIndex] = res;
        })
        .catch(err => {
          result[currentIndex] = err;
        })
        .finally(() => {
          finishCount++;
          if (finishCount === urls.length) {
            resolve(result); // 所有请求完成
          }
          if (index < urls.length) {
            request(); // 继续下一个请求
          }
        });
    }
    // 启动 maxNum 个并发请求（或 urls.length 个）
    for (let i = 0; i < Math.min(maxNum, urls.length); i++) {
      request();
    }
  });
}
/**
 * 使用示例
 * 
 * */ 

const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3',
  'https://jsonplaceholder.typicode.com/todos/4',
  'https://jsonplaceholder.typicode.com/todos/5',
];

concurRequest(urls, 2).then(results => {
  console.log('所有请求已完成:', results);
});