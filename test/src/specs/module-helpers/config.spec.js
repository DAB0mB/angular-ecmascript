import { Config } from 'angular-ecmascript/module-helpers';

describe('Config', function() {
  beforeEach(function() {
    spyOn(this.module, 'config').and.callThrough();
  });

  it('should load a config helper', function() {
    const $dep = {};
    const expectedResult = {};
    const ctorSpy = jasmine.createSpy('ctor');

    class TestConfig extends Config {
      static $inject = ['$dep']

      constructor(...args) {
        super(...args);
        this::ctorSpy(...args);
      }

      configure(...args) {
        return expectedResult;
      }
    }

    this.loader.load(TestConfig);

    const load = this.module.config.calls.mostRecent();
    const [helper] = load.args;

    const result = helper($dep);
    const config = ctorSpy.calls.mostRecent().object;

    expect(config).toEqual(jasmine.any(TestConfig));
    expect(config.$dep).toEqual($dep);
    expect(result).toEqual(expectedResult);
  });
});