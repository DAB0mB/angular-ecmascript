import { Directive } from 'angular-ecmascript/module-helpers';

describe('Directive', function() {
  beforeEach(function() {
    spyOn(this.module, 'directive').and.callThrough();
  });

  it('should load a directive helper', function() {
    const $dep = {};
    const expectedResult = {};
    const ctorSpy = jasmine.createSpy('ctor');

    class TestDirective extends Directive {
      static $inject = ['$dep']

      constructor(...args) {
        super(...args);
        this::ctorSpy(...args);
      }
    }

    this.loader.load(TestDirective);

    const load = this.module.directive.calls.mostRecent();
    const [name, helper] = load.args;

    expect(name).toEqual('TestDirective');

    const create = helper($dep);
    const directive = ctorSpy.calls.mostRecent().object;

    expect(directive).toEqual(jasmine.any(TestDirective));
    expect(directive.$dep).toEqual($dep);
  });

  it('should load a directive with a custom name', function() {
    const $dep = {};
    const expectedResult = {};
    const ctorSpy = jasmine.createSpy('ctor');

    class TestDirective extends Directive {
      static $inject = ['$dep']
      static $name = 'customDirectiveName'

      constructor(...args) {
        super(...args);
        this::ctorSpy(...args);
      }
    }

    this.loader.load(TestDirective);

    const load = this.module.directive.calls.mostRecent();
    const [name, helper] = load.args;

    expect(name).toEqual('customDirectiveName');

    const create = helper($dep);
    const directive = ctorSpy.calls.mostRecent().object;

    expect(directive).toEqual(jasmine.any(TestDirective));
    expect(directive.$dep).toEqual($dep);
  });
});