import { Factory } from 'angular-ecmascript/module-helpers';

describe('Factory', function() {
  beforeEach(function() {
    spyOn(this.module, 'factory').and.callThrough();
  });

  it('should load a factory helper', function() {
    const $dep = {};
    const expectedResult = {};
    const ctorSpy = jasmine.createSpy('ctor');
    const methodSpy = jasmine.createSpy('method');

    class TestFactory extends Factory {
      static $inject = ['$dep']

      constructor(...args) {
        super(...args);
        this::ctorSpy(...args);
      }

      create(...args) {
        this::methodSpy(...args);
        return expectedResult;
      }
    }

    this.loader.load(TestFactory);

    const load = this.module.factory.calls.mostRecent();
    const [name, helper] = load.args;

    expect(name).toEqual('TestFactory');

    const method = helper($dep);
    const result = method();
    const expectedFactory = ctorSpy.calls.mostRecent().object;
    const factory = methodSpy.calls.mostRecent().object;

    expect(expectedFactory).toEqual(jasmine.any(TestFactory));
    expect(factory).toEqual(expectedFactory);
    expect(factory.$dep).toEqual($dep);
    expect(result).toEqual(expectedResult);
  });

  it('should load a factory with a custom name', function() {
    const $dep = {};
    const expectedResult = {};
    const ctorSpy = jasmine.createSpy('ctor');
    const methodSpy = jasmine.createSpy('method');

    class TestFactory extends Factory {
      static $inject = ['$dep']
      static $name = 'customFactoryName'

      constructor(...args) {
        super(...args);
        this::ctorSpy(...args);
      }

      create(...args) {
        this::methodSpy(...args);
        return expectedResult;
      }
    }

    this.loader.load(TestFactory);

    const load = this.module.factory.calls.mostRecent();
    const [name, helper] = load.args;

    expect(name).toEqual('customFactoryName');

    const method = helper($dep);
    const result = method();
    const expectedFactory = ctorSpy.calls.mostRecent().object;
    const factory = methodSpy.calls.mostRecent().object;

    expect(expectedFactory).toEqual(jasmine.any(TestFactory));
    expect(factory).toEqual(expectedFactory);
    expect(factory.$dep).toEqual($dep);
    expect(result).toEqual(expectedResult);
  });
});