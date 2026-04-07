
function myNew(Constructor, ...args) {
    // 1. 创建一个空的简单 JavaScript 对象（即 {}）
    const obj = {};
    // 2. 将新对象的 [[Prototype]] 链接到构造函数的 prototype 属性
    //    这样 obj 就能继承 Constructor.prototype 上的所有方法和属性
    Object.setPrototypeOf(obj, Constructor.prototype);
    // 或者使用: obj.__proto__ = Constructor.prototype; (不推荐，__proto__ 已废弃)
    
    // 3. 将构造函数 Constructor 的 this 绑定到新对象 obj，并执行构造函数
    //    使用 apply 方法，让 Constructor 内部的 this 指向 obj
    const result = Constructor.apply(obj, args);
    // 4. 根据构造函数的返回值决定最终返回什么
    //    如果构造函数返回了一个对象（非 null 的对象），则返回这个对象
    //    否则，返回新创建的对象 obj
    if (result !== null && (typeof result === 'object' || typeof result === 'function')) {
        return result;
    }
    return obj;
}
function myNew(Constructor, ...args) {
    // 1 & 2: 创建一个新对象，并将其原型设置为 Constructor.prototype
    const obj = Object.create(Constructor.prototype);
    // 3: 将构造函数的 this 绑定到新对象并执行
    const result = Constructor.apply(obj, args);
    // 4: 根据返回值决定返回对象
    if (result !== null && (typeof result === 'object' || typeof result === 'function')) {
        return result;
    }
    return obj;
}