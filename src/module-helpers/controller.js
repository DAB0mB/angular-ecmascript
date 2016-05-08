import Injectable from './injectable';
import * as Utils from '../utils';

export default class Controller extends Injectable {
  constructor(...args) {
    super(...args);

    const createViewModel = this.$scope &&
      (this.$scope.$viewModel || this.$scope.viewModel);

    if (Utils.isFunction(createViewModel)) {
      createViewModel.call(this.$scope, this);
    }
  }
}