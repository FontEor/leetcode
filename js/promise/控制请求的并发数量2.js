// 控制并发数量1
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
