import Angular from 'angular';
import * as Helpers from 'angular-ecmascript/module-helpers';
import Loader from 'angular-ecmascript/module-loader';

describe('Loader', () => {
  let testModule;
  let loader;

  beforeEach(() => {
    testModule = Angular.module('angular-ecmascript-test', []);
    loader = new Loader(testModule);
  });

  describe('#load()', () => {
    beforeEach(() => {
      spyOn(testModule, 'provider').and.callThrough();
    });

    fdescribe('given Provider', () => {
      it('should load a provider helper', () => {
        class TestProvider extends Helpers.Provider {
          static $inject = ['$dep1', '$dep2', '$dep3']

          $get() {
          }
        }

        loader.load(TestProvider);

        const definition = testModule.provider.calls.mostRecent();
        const [name, helper] = definition.args;

        expect(name).toEqual('TestProvider');
        expect(helper).toEqual(TestProvider);
      });
    });

    describe('given Service', () => {

    });

    describe('given Controller', () => {

    });

    describe('given Directive', () => {

    });

    describe('given Decorator', () => {

    });

    describe('given Factory', () => {

    });

    describe('given Config', () => {

    });

    describe('given Runner', () => {

    });
  });
});