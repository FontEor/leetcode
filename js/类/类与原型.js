class A {
  constructor() {}
}
class B extends A {
  constructor() {
    super();
  }
}
const a = new A();
const b = new B();
console.log(A.prototype.__proto__ === Object.prototype);
console.log(A.__proto__ === Function.prototype);
console.log(A.prototype.constructor === A);
console.log(B.__proto__ === A); //类的原型链
console.log(B.__proto__.prototype === A.prototype); //推导出来的
console.log(B.prototype.__proto__ === A.prototype); // 实例的原型链
console.log(B.prototype.__proto__ === B.__proto__.prototype); //推导出来的
console.log(a.__proto__ === A.prototype);
console.log(b.__proto__ === B.prototype);
console.log(a.__proto__ === b.__proto__.__proto__); //推导出来的
console.log(a.__proto__ === B.prototype.__proto__); //推导出来的
// __proto__ 是用来表示关系的
// prototype 是用来定义方法和属性的
// 如果 B 是一个普通的函数，B.__proto__ 指向 Function.prototype
