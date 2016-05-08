import Injectable from './injectable';

export default class Directive extends Injectable {
  compile() {
    return this.link.bind(this);
  }
}