import Injectable from './injectable';

export default class Factory extends Injectable {
  create() {
    throw Error('Factory#create() must be implemented');
  }
}