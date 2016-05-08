import Injectable from './injectable';

export default class Runner extends Injectable {
  run() {
    throw Error('Runner#run() must be implemented');
  }
}