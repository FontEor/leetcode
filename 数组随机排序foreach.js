var Solution = function(nums) {
    this.nums = nums
    this.arr = []
    for (let i = 0; i < this.nums.length; i++) {
        this.arr[i] = this.nums[i]
    }
};
Solution.prototype.reset = function() {
    return this.arr
};
Solution.prototype.shuffle = function() {
    //arr.forEach(callback(currentValue [, index [, array]])[, thisArg])
    this.nums.forEach((currentValue, i, a, j) => (j = Math.floor(Math.random() * this.nums.length), [a[i], a[j]] = [a[j], a[i]]))
    return this.nums
};
let solution = new Solution([1, 2, 3]);
console.log(solution.shuffle())
console.log(solution.reset())
console.log(solution.shuffle())