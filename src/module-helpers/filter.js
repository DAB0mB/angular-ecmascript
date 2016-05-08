import Injectable from './injectable';

export default class Filter extends Injectable {
  filter() {
    throw Error('Filter#filter() must be implemented');
  }
}