import { Service } from 'angular-ecmascript/module-helpers';

describe('Service', function() {
  beforeEach(function() {
    spyOn(this.module, 'service').and.callThrough();
  });

  it('should load a service helper', function() {
    class TestService extends Service {}

    this.loader.load(TestService);

    const load = this.module.service.calls.mostRecent();
    const [name, helper] = load.args;

    expect(name).toEqual('TestService');
    expect(helper).toEqual(TestService);
  });

  it('should load a service with a custom', function() {
    class TestService extends Service {
      static $name = 'customServiceName'
    }

    this.loader.load(TestService);

    const load = this.module.service.calls.mostRecent();
    const [name, helper] = load.args;

    expect(name).toEqual('customServiceName');
    expect(helper).toEqual(TestService);
  });
});