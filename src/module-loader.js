import Angular from 'angular';
import * as Helpers from './module-helpers';
import * as Utils from './utils';

export default class Loader {
  constructor(ngModule, dependencies) {
    if (Utils.isString(ngModule)) {
      ngModule = Angular.module(ngModule, dependencies);
    }

    this.module = ngModule;
  }

  load(Helper, ...args) {
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
  }

  _loadProvider(Provider) {
    this.module.provider(Provider.$name, Provider);
  }

  _loadService(Service) {
    this.module.service(Service.$name, Service)
  }

  _loadController(Controller) {
    var $inject = Controller.$inject;

    if (!Utils.hasValue($inject, '$scope')) {
      $inject.unshift('$scope');
    }

    this.module.controller(Controller.$name, Controller);
  }

  _loadDirective(Directive) {
    function helper() {
      return new Directive(...arguments);
    }

    helper.$inject = Directive.$inject;
    this.module.directive(Directive.$name, helper);
  }

  _loadDecorator(Decorator) {
    function helper() {
      const decorator = new Decorator(...arguments);
      return decorator.decorate.bind(decorator);
    }

    helper.$inject = Decorator.$inject;
    this.module.decorator(Decorator.$name, helper);
  }

  _loadFactory(Factory) {
    function helper() {
      const factory = new Factory(...arguments);
      return factory.create.bind(factory);
    }

    helper.$inject = Factory.$inject;
    this.module.factory(Factory.$name, helper);
  }

  _loadFilter(Filter) {
    function helper() {
      const filter = new Filter(...arguments);
      return filter.filter.bind(filter);
    }

    helper.$inject = Filter.$inject;
    this.module.filter(Filter.$name, helper);
  }

  _loadConfig(Config) {
    function helper() {
      const config = new Config(...arguments);
      return config.configure();
    }

    helper.$inject = Config.$inject;
    this.module.config(helper);
  }

  _loadRunner(Runner) {
    function helper() {
      const runner = new Runner(...arguments);
      return runner.run();
    }

    helper.$inject = Runner.$inject;
    this.module.run(helper);
  }
}
