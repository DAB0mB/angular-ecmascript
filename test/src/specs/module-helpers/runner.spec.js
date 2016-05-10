import { Runner } from 'angular-ecmascript/module-helpers';

describe('Runner', function() {
  beforeEach(function() {
    spyOn(this.module, 'run').and.callThrough();
  });

  it('should load a runner helper', function() {
    const $dep = {};
    const expectedResult = {};
    const ctorSpy = jasmine.createSpy('ctor');

    class TestRunner extends Runner {
      static $inject = ['$dep']

      constructor(...args) {
        super(...args);
        this::ctorSpy(...args);
      }

      run(...args) {
        return expectedResult;
      }
    }

    this.loader.load(TestRunner);

    const load = this.module.run.calls.mostRecent();
    const [helper] = load.args;

    const result = helper($dep);
    const runner = ctorSpy.calls.mostRecent().object;

    expect(runner).toEqual(jasmine.any(TestRunner));
    expect(runner.$dep).toEqual($dep);
    expect(result).toEqual(expectedResult);
  });
});