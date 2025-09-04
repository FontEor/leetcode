// 事件中心
class EventEmitter {
  constructor() {
    // 存储事件和回调的映射 { eventName: [callback1, callback2] }
    this.events = {};
  }

  /**
   * 订阅事件
   * @param {string} eventName - 事件名称
   * @param {function} callback - 回调函数
   */
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  /**
   * 只订阅一次（触发一次后自动取消）
   * @param {string} eventName - 事件名称
   * @param {function} callback - 回调函数
   */
  once(eventName, callback) {
    // 包装一个只执行一次的回调
    const onceWrapper = (...args) => {
      callback.apply(this, args);
      // 执行后立即取消订阅
      this.off(eventName, onceWrapper);
    };
    // 保存原始函数，便于取消
    onceWrapper.listener = callback;
    this.on(eventName, onceWrapper);
  }

  /**
   * 发布事件
   * @param {string} eventName - 事件名称
   * @param  {...any} args - 传递给回调函数的参数
   */
  emit(eventName, ...args) {
    if (this.events[eventName]) {
      // 遍历所有该事件的回调并执行
      this.events[eventName].forEach(callback => {
        callback.apply(this, args);
      });
    } else {
      console.warn(`事件 "${eventName}" 没有订阅者`);
    }
  }

  /**
   * 取消订阅
   * @param {string} eventName - 事件名称
   * @param {function} callback - 要取消的回调函数（可选：不传则取消该事件所有回调）
   */
  off(eventName, callback) {
    const callbacks = this.events[eventName];
    if (callbacks) {
      if (callback) {
        // 取消指定回调
        const index = callbacks.indexOf(callback);
        if (index !== -1) {
          callbacks.splice(index, 1);
        }
      } else {
        // 取消该事件所有回调
        delete this.events[eventName];
      }
    }
  }

  /**
   * 清空所有事件
   */
  clear() {
    this.events = {};
  }
}