import { Filter } from 'angular-ecmascript/module-helpers';

describe('Filter', function() {
  beforeEach(function() {
    spyOn(this.module, 'filter').and.callThrough();
  });

  it('should load a filter helper', function() {
    const $dep = {};
    const expectedResult = {};
    const ctorSpy = jasmine.createSpy('ctor');
    const methodSpy = jasmine.createSpy('method');

    class TestFilter extends Filter {
      static $inject = ['$dep']

      constructor(...args) {
        super(...args);
        this::ctorSpy(...args);
      }

      filter(...args) {
        this::methodSpy(...args);
        return expectedResult;
      }
    }

    this.loader.load(TestFilter);

    const load = this.module.filter.calls.mostRecent();
    const [name, helper] = load.args;

    expect(name).toEqual('TestFilter');

    const method = helper($dep);
    const result = method();
    const expectedFilter = ctorSpy.calls.mostRecent().object;
    const filter = methodSpy.calls.mostRecent().object;

    expect(expectedFilter).toEqual(jasmine.any(TestFilter));
    expect(filter).toEqual(expectedFilter);
    expect(filter.$dep).toEqual($dep);
    expect(result).toEqual(expectedResult);
  });

  it('should load a filter with a custom name', function() {
    const $dep = {};
    const expectedResult = {};
    const ctorSpy = jasmine.createSpy('ctor');
    const methodSpy = jasmine.createSpy('method');

    class TestFilter extends Filter {
      static $inject = ['$dep']
      static $name = 'customFilterName'

      constructor(...args) {
        super(...args);
        this::ctorSpy(...args);
      }

      filter(...args) {
        this::methodSpy(...args);
        return expectedResult;
      }
    }

    this.loader.load(TestFilter);

    const load = this.module.filter.calls.mostRecent();
    const [name, helper] = load.args;

    expect(name).toEqual('customFilterName');

    const method = helper($dep);
    const result = method();
    const expectedFilter = ctorSpy.calls.mostRecent().object;
    const filter = methodSpy.calls.mostRecent().object;

    expect(expectedFilter).toEqual(jasmine.any(TestFilter));
    expect(filter).toEqual(expectedFilter);
    expect(filter.$dep).toEqual($dep);
    expect(result).toEqual(expectedResult);
  });
});