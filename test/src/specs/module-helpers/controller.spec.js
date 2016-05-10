import { Controller } from 'angular-ecmascript/module-helpers';

describe('Controller', function() {
  beforeEach(function() {
    spyOn(this.module, 'controller').and.callThrough();
  });

  it('should set controller as the view model when using `angular-meteor`', function() {
    class TestController extends Controller {
      static $inject = ['$scope']
    }

    const $scope = {
      $viewModel: jasmine.createSpy('$viewModel')
    };

    const controller = new TestController($scope);
    expect($scope.$viewModel).toHaveBeenCalledWith(controller);
  });

  it('should load a controller helper', function() {
    class TestController extends Controller {
      static $inject = ['$scope']
    }

    this.loader.load(TestController);

    const load = this.module.controller.calls.mostRecent();
    const [name, helper] = load.args;

    expect(name).toEqual('TestController');
    expect(helper).toEqual(TestController);
  });

  it('should load a controller with a custom name', function() {
    class TestController extends Controller {
      static $name = 'customControllerName'
      static $inject = ['$scope']
    }

    this.loader.load(TestController);

    const load = this.module.controller.calls.mostRecent();
    const [name, helper] = load.args;

    expect(name).toEqual('customControllerName');
    expect(helper).toEqual(TestController);
  });

  it('should inject a `$scope` dependency by default', function() {
    class TestController extends Controller {
      static $inject = ['$dep'];
    }

    this.loader.load(TestController);
    expect(TestController.$inject).toEqual(['$scope', '$dep']);

    const load = this.module.controller.calls.mostRecent();
    const [name, helper] = load.args;

    expect(name).toEqual('TestController');
    expect(helper).toEqual(TestController);
  });
});