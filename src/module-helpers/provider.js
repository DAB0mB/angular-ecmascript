import Injectable from './injectable';

export default class Provider extends Injectable {
  $get() {
    throw Error('Provider#$get() must be implemented');
  }
}