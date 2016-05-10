import { Injectable } from 'angular-ecmascript/module-helpers';

describe('Injectable', function() {
  it('should define injected dependencies on instance', function() {
    const $dep1 = {};
    const $dep2 = {};
    const $dep3 = {};

    class TestInjectable extends Injectable {
      static $inject = ['$dep1', '$dep2', '$dep3'];
    }

    var injectable = new TestInjectable($dep1, $dep2, $dep3);
    expect(injectable.$dep1).toEqual($dep1);
    expect(injectable.$dep2).toEqual($dep2);
    expect(injectable.$dep3).toEqual($dep3);
  });
});