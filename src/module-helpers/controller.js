var Injectable = require('./injectable');
var Utils = require('../utils');

function Controller() {
  Injectable.apply(this, arguments);

  var createViewModel = this.$scope &&
    (this.$scope.$viewModel || this.$scope.viewModel);

  if (Utils.isFunction(createViewModel)) {
    createViewModel.call(this.$scope, this);
  }
}

Utils.class(Controller, Injectable);

module.exports = Controller;