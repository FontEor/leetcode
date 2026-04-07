// 节流 在规定的时间内，不管你触发了多少次，只执行一次。
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

// 防抖 在事件触发后，等待一段时间。如果这段时间内事件再次被触发，则重新计时。
const debounce = (fn, wait) => {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
};
