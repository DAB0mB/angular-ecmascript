var Angular = require('angular');
var Helpers = require('./module-helpers');
var Utils = require('./utils');

function Loader(ngModule, dependencies) {
  if (Utils.isString(ngModule)) {
    ngModule = Angular.module(module, dependencies);
  }

  this.module = ngModule;
}

Utils.class(Loader, {
  load: function(Helper) {
    var args = Utils.toArray(arguments).slice(1);

    if (Utils.isFunction(Helper)) {
      var proto = Helper.prototype;
      Helper.$name = Helper.$name || Helper.name;
      Helper.$inject = Helper.$inject || [];

      if (proto instanceof Helpers.Provider)
        this._loadProvider(Helper);
      else if (proto instanceof Helpers.Service)
        this._loadService(Helper);
      else if (proto instanceof Helpers.Controller)
        this._loadController(Helper);
      else if (proto instanceof Helpers.Directive)
        this._loadDirective(Helper);
      else if (proto instanceof Helpers.Decorator)
        this._loadDecorator(Helper);
      else if (proto instanceof Helpers.Factory)
        this._loadFactory(Helper);
      else if (proto instanceof Helpers.Filter)
        this._loadFilter(Helper);
      else if (proto instanceof Helpers.Config)
        this._loadConfig(Helper);
      else if (proto instanceof Helpers.Runner)
        this._loadRunner(Helper);
      else
        throw Error("can't load unknown module-helper");
    }
    else if (Utils.isString(Helper)) {
      this.module[Helper].apply(this.module, args);
    }
    else {
      throw Error("'Helper' must be a function or a string");
    }

    return this;
  },

  _loadProvider(Provider) {
    this.module.provider(Provider.$name, Provider);
  },

  _loadService(Service) {
    this.module.service(Service.$name, Service)
  },

  _loadController(Controller) {
    var $inject = Controller.$inject;

    if (!Utils.hasValue($inject, '$scope')) {
      $inject.unshift('$scope');
    }

    this.module.controller(Controller.$name, Controller);
  },

  _loadDirective(Directive) {
    function handler() {
      return new Directive(...arguments);
    }

    handler.$inject = Directive.$inject;
    this.module.directive(Directive.$name, handler);
  },

  _loadDecorator(Decorator) {
    function handler() {
      const decorator = new Decorator(...arguments);
      return decorator.decorate.bind(decorator);
    }

    handler.$inject = Decorator.$inject;
    this.module.decorator(Decorator.$name, handler);
  },

  _loadFactory(Factory) {
    function handler() {
      const factory = new Factory(...arguments);
      return factory.create.bind(factory);
    }

    handler.$inject = Factory.$inject;
    this.module.factory(Factory.$name, handler);
  },

  _loadFilter(Filter) {
    function handler() {
      const filter = new Filter(...arguments);
      return filter.filter.bind(filter);
    }

    handler.$inject = Filter.$inject;
    this.module.filter(Filter.$name, handler);
  },

  _loadConfig(Config) {
    function handler() {
      const config = new Config(...arguments);
      return config.configure();
    }

    handler.$inject = Config.$inject;
    this.module.config(handler);
  },

  _loadRunner(Runner) {
    function handler() {
      const runner = new Runner(...arguments);
      return runner.run();
    }

    handler.$inject = Runner.$inject;
    this.module.run(handler);
  }
});

module.exports = Loader;