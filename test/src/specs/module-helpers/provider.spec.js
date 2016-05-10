import { Provider } from 'angular-ecmascript/module-helpers';

describe('Provider', function() {
  beforeEach(function() {
    spyOn(this.module, 'provider').and.callThrough();
  });

  it('should load a proider helper', function() {
    class TestProvider extends Provider {}

    this.loader.load(TestProvider);

    const load = this.module.provider.calls.mostRecent();
    const [name, helper] = load.args;

    expect(name).toEqual('TestProvider');
    expect(helper).toEqual(TestProvider);
  });

  it('should load a provider with a custom name', function() {
    class TestProvider extends Provider {
      static $name = 'customProviderName'
    }

    this.loader.load(TestProvider);

    const load = this.module.provider.calls.mostRecent();
    const [name, helper] = load.args;

    expect(name).toEqual('customProviderName');
    expect(helper).toEqual(TestProvider);
  });
});