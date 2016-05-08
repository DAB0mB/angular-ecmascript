export default class Injectable {
  constructor(...args) {
    this.constructor.$inject.forEach((name, i) => {
      this[name] = args[i];
    });
  }
}