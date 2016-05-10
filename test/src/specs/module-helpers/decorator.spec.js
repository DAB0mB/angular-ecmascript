import { Decorator } from 'angular-ecmascript/module-helpers';

describe('Decorator', function() {
  beforeEach(function() {
    spyOn(this.module, 'decorator').and.callThrough();
  });

  it('should load a decorator helper', function() {
    const $delegate = {};
    const expectedResult = {};
    const ctorSpy = jasmine.createSpy('ctor');
    const methodSpy = jasmine.createSpy('method');

    class TestDecorator extends Decorator {
      static $inject = ['$delegate']

      constructor(...args) {
        super(...args);
        this::ctorSpy(...args);
      }

      decorate(...args) {
        this::methodSpy(...args);
        return expectedResult;
      }
    }

    this.loader.load(TestDecorator);

    const load = this.module.decorator.calls.mostRecent();
    const [name, helper] = load.args;

    expect(name).toEqual('TestDecorator');

    const method = helper($delegate);
    const result = method();
    const expectedDecorator = ctorSpy.calls.mostRecent().object;
    const decorator = methodSpy.calls.mostRecent().object;

    expect(expectedDecorator).toEqual(jasmine.any(Decorator));
    expect(decorator).toEqual(expectedDecorator);
    expect(decorator.$delegate).toEqual($delegate);
    expect(result).toEqual(expectedResult);
  });

  it('should load a decorator with a custom name', function() {
    const $delegate = {};
    const expectedResult = {};
    const ctorSpy = jasmine.createSpy('ctor');
    const methodSpy = jasmine.createSpy('method');

    class TestDecorator extends Decorator {
      static $inject = ['$delegate']
      static $name = 'customDecoratorName'

      constructor(...args) {
        super(...args);
        this::ctorSpy(...args);
      }

      decorate(...args) {
        this::methodSpy(...args);
        return expectedResult;
      }
    }

    this.loader.load(TestDecorator);

    const load = this.module.decorator.calls.mostRecent();
    const [name, helper] = load.args;

    expect(name).toEqual('customDecoratorName');

    const method = helper($delegate);
    const result = method();
    const expectedDecorator = ctorSpy.calls.mostRecent().object;
    const decorator = methodSpy.calls.mostRecent().object;

    expect(expectedDecorator).toEqual(jasmine.any(TestDecorator));
    expect(decorator).toEqual(expectedDecorator);
    expect(decorator.$delegate).toEqual($delegate);
    expect(result).toEqual(expectedResult);
  });

  it('should inject a `$delegate` dependency by default', function() {
    const $delegate = {};
    const $dep = {};
    const expectedResult = {};
    const ctorSpy = jasmine.createSpy('ctor');
    const methodSpy = jasmine.createSpy('method');

    class TestDecorator extends Decorator {
      static $inject = ['$dep']

      constructor(...args) {
        super(...args);
        this::ctorSpy(...args);
      }

      decorate(...args) {
        this::methodSpy(...args);
        return expectedResult;
      }
    }

    this.loader.load(TestDecorator);
    expect(TestDecorator.$inject).toEqual(['$delegate', '$dep']);

    const load = this.module.decorator.calls.mostRecent();
    const [name, helper] = load.args;

    expect(name).toEqual('TestDecorator');

    const method = helper($delegate, $dep);
    const result = method();
    const expectedDecorator = ctorSpy.calls.mostRecent().object;
    const decorator = methodSpy.calls.mostRecent().object;

    expect(expectedDecorator).toEqual(jasmine.any(TestDecorator));
    expect(decorator).toEqual(expectedDecorator);
    expect(decorator.$dep).toEqual($dep);
    expect(result).toEqual(expectedResult);
  });
});