class A {
  constructor() {
    this.Events = {};
  }
  emit = (name, fn, ...arg) => {
    this.Events[fn](name)(arg);
  };
  on = (name, fn) => {
    this.Events[fn].push(name);
  };
}
