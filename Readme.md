# 待复习

1、各种排序算法
2、promise 相关的算法
3、echarts 优化（大数量的渲染）
4、找出最长的回文串
5、并发请求数量控制

/\*\*

- 1.  简单实现一个斐波那契函数
- 0 1 1 2 3 5 8
  \*/
  function fibonacci(n) {
  if(n<2) return n
  return fibonacci(n-1) + fibonacci(n-2)
  // todo
  }
  // test
  // console.time('fibonacci cost')
  // fibonacci(20)
  // console.timeEnd('fibonacci cost')

/\*\*

- 2.  考虑性能，实现一个斐波那契函数
- [a, b] = [b, a]
  \*/
  function fastFibonacci(n) {
  // todo  
   if(n<2) return n
  let index= 2
  let result1 = 0
  let result2 = 1
  while(index<=n){
  result1 = result1 + result2
  result2= result1 + result2
  index++
  }
  if(n%2===0){
  return result2
  }else{
  return result1
  }

}  
// test
// console.time('fastFibonacci cost')
// fibonacci(80)
// console.timeEnd('fastFibonacci cost')

// 3、请实现一个数组的 reduce 方法
Array.prototype.reduce = function(callbackFn, initialValue) {
let result = initialValue ?initialValue : 0
const callbackFn = (...args)=>{
for(let i=0;i<args[args.length-1].length;i++){
result+=args[args.length-1][i]
}
return result
}
}
