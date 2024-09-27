//实现一个自定义定时器，可以传入a，b。第一次执行在 a 秒后，之后执行都是 b 秒后
async function interval(a, b) {
  let param = await timeOut(a, b);
  setInterval(() => {
    console.log(`${param}秒，一直执行执行`);
  }, param * 1000);
}
function timeOut(a, b) {
  return new Promise((resolve) => {
    let timer = setTimeout(() => {
      console.log(`${a}秒，第一次执行`);
      clearTimeout(timer);
      resolve(b);
    }, a * 1000);
  });
}
interval(2, 1);
