import Injectable from './injectable';

export default class Decorator extends Injectable {
  decorate() {
    throw Error('Decorator#decorate() must be implemented');
  }
}