import Injectable from './injectable';

export default class Config extends Injectable {
  configure() {
    throw Error('Config#configure() must be implemented');
  }
}