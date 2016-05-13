import Angular from 'angular';
import Loader from 'angular-ecmascript/module-loader';
import * as Helpers from 'angular-ecmascript/module-helpers';

describe('Loader', function() {
  it('should create a new module if not specified', function() {
    spyOn(Angular, 'module');

    const moduleName = 'custom-module';
    const moduleDeps = ['module1', 'module2'];
    const loader = new Loader(moduleName, moduleDeps);
    const definition = Angular.module.calls.mostRecent()

    expect(definition.args).toEqual([moduleName, moduleDeps]);
  });

  it('should load multiple helpers given an array', function() {
    spyOn(this.module, 'provider');
    spyOn(this.module, 'service');
    spyOn(this.module, 'controller');

    class TestProvider extends Helpers.Provider {}
    class TestService extends Helpers.Service {}
    class TestCtrl extends Helpers.Controller {}

    this.loader.load([TestProvider, TestService, TestCtrl]);

    expect(this.module.provider).toHaveBeenCalledWith('TestProvider', TestProvider);
    expect(this.module.service).toHaveBeenCalledWith('TestService', TestService);
    expect(this.module.controller).toHaveBeenCalledWith('TestCtrl', TestCtrl);
  });

  it('should load a custom helper given a string', function() {
    this.module.helper = jasmine.createSpy('helper');
    const helper = Angular.noop;

    this.loader.load('helper', helper);
    const definition = this.module.helper.calls.mostRecent();

    expect(definition.args).toEqual([helper]);
  });
});