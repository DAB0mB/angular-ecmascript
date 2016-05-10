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
      const proto = Helper.prototype;
      Helper.$name = Helper.$name || Helper.name;
      Helper.$inject = Helper.$inject || [];

      if (proto instanceof Helpers.Provider)
        this.loadProvider(Helper);
      else if (proto instanceof Helpers.Service)
        this.loadService(Helper);
      else if (proto instanceof Helpers.Controller)
        this.loadController(Helper);
      else if (proto instanceof Helpers.Directive)
        this.loadDirective(Helper);
      else if (proto instanceof Helpers.Decorator)
        this.loadDecorator(Helper);
      else if (proto instanceof Helpers.Factory)
        this.loadFactory(Helper);
      else if (proto instanceof Helpers.Filter)
        this.loadFilter(Helper);
      else if (proto instanceof Helpers.Config)
        this.loadConfig(Helper);
      else if (proto instanceof Helpers.Runner)
        this.loadRunner(Helper);
      else
        throw Error('can\'t load unknown module-helper');
    }
    else if (Utils.isString(Helper)) {
      this.module::this.module[Helper](...args);
    }
    else {
      throw Error('`Helper` must be a function or a string');
    }

    return this;
  }

  loadProvider(Provider) {
    this.module.provider(Provider.$name, Provider);
  }

  loadService(Service) {
    this.module.service(Service.$name, Service)
  }

  loadController(Controller) {
    const $inject = Controller.$inject;

    if (!Utils.hasValue($inject, '$scope')) {
      $inject.unshift('$scope');
    }

    this.module.controller(Controller.$name, Controller);
  }

  loadDirective(Directive) {
    function helper(...args) {
      return new Directive(...args);
    }

    helper.$inject = Directive.$inject;
    this.module.directive(Directive.$name, helper);
  }

  loadDecorator(Decorator) {
    function helper(...args) {
      const decorator = new Decorator(...args);
      return decorator::decorator.decorate;
    }

    const $inject = Decorator.$inject;

    if (!Utils.hasValue($inject, '$delegate')) {
      $inject.unshift('$delegate');
    }

    this.module.decorator(Decorator.$name, helper);
  }

  loadFactory(Factory) {
    function helper(...args) {
      const factory = new Factory(...args);
      return factory::factory.create;
    }

    helper.$inject = Factory.$inject;
    this.module.factory(Factory.$name, helper);
  }

  loadFilter(Filter) {
    function helper(...args) {
      const filter = new Filter(...args);
      return filter::filter.filter;
    }

    helper.$inject = Filter.$inject;
    this.module.filter(Filter.$name, helper);
  }

  loadConfig(Config) {
    function helper(...args) {
      const config = new Config(...args);
      return config.configure();
    }

    helper.$inject = Config.$inject;
    this.module.config(helper);
  }

  loadRunner(Runner) {
    function helper(...args) {
      const runner = new Runner(...args);
      return runner.run();
    }

    helper.$inject = Runner.$inject;
    this.module.run(helper);
  }
}
