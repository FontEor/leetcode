// 节流
const throttle = (fn, wait) => {
  let timer = null;
  return function (...args) {
    const now = Date.now();
    if (timer === null || now - timer > wait) {
      fn.apply(this, args);
      timer = now;
    }
  };
};

// 防抖
const debounce = (fn, wait) => {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
};