function Injectable() {
  var self = this;
  var args = arguments;

  self.constructor.$inject.forEach(function(name, i) {
    self[name] = args[i];
  });
}

module.exports = Injectable;