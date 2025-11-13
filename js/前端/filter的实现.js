Array.prototype.myFilter = function (fn) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};
const arr = [1, 2, 3, 4];
arr.filter((item) => {
  item === 1;
});
