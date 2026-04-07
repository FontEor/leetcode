// 1. 被观察者（Subject）
class Subject {
  constructor() {
    this.state = 'stable'; // 初始状态
    this.observers = [];   // 观察者列表
  }

  // 添加观察者
  attach(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
      console.log(`${observer.name} 已订阅状态更新`);
    }
  }

  // 移除观察者
  detach(observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
      console.log(`${observer.name} 已取消订阅`);
    }
  }

  // 通知所有观察者
  notify() {
    console.log(`[通知] 状态已变为：${this.state}`);
    this.observers.forEach(observer => {
      observer.update(this.state);
    });
  }

  // 改变状态（触发通知）
  setState(newState) {
    this.state = newState;
    this.notify(); // 状态变化，自动通知
  }

  // 获取当前状态
  getState() {
    return this.state;
  }
}

// 2. 观察者（Observer）
class Observer {
  constructor(name) {
    this.name = name;
  }

  // 更新方法（被通知时调用）
  update(state) {
    console.log(`⚠️  ${this.name} 收到更新：当前状态为 "${state}"`);
  }
}