# Angular-Ecmascript

`angular-ecmascript` is a utility library which will help you write an [AngularJS](https://angularjs.org) app using `ES6`'s class system.
As for now there is no official way to do so, however using `ES6` syntax is recommended, hence this library was created.

In addition, `angular-ecmascript` provides us with some very handy features, like auto-injection without using any pre-processors like [ng-annotate](https://github.com/olov/ng-annotate). For more information about `angular-ecmascript`'s API and features please read the following [docs](#docs).

## Docs

`angular-ecmascript` provides us with some base `module-helpers` classes which we should inherit from while writing our helpers. These are the available helpers:

- [Provider](#provider)
- [Service](#service)
- [Factory](#factory)
- [Controller](#controller)
- [Directive](#directive)
- [Decorator](#decorator)
- [Filter](#filter)
- [Config](#config)
- [Runner](#runner)

Each helper can be defined with a static `$inject` property which will be responsible for dependencies injection, and a static `$name` property, which is responsible for specifying the helper's name and defaults to the class'es name.

```js
import { Service, Controller } from 'angular-ecmascript/module-helpers';

class DateService extends Service {
  static $name = '$date'

  now() {
    return new Date().getTime();
  }
}

class MyController extends Controller {
  static $inject = ['$date']

  constructor(...args) {
    super(...args);

    this.createdAt = this.$date.now();
  }
}
```

To interface with these helpers we will need to use a `module-loader` provided by `angular-ecmascript`. Just create a new `AngularJS` module wrapped by the loader and use it like so:

```js
// libs
import Angular from 'angular';
import Loader from 'angular-ecmascript/module-loader';
// module-helpers
import MyCtrl from './controllers/my.ctrl';
import MyDirective from './directives/my.directive';
import MyService from './services/my.service';

// app
App = Angular.module('my-app', [
  'module1',
  'module2',
  'module3'
]);

// loader
new Loader(App)
  .load(MyCtrl)
  .load(MyDirective)
  .load(MyService);
```

- `Loader()` can take a module name as the first argument and an optional dependencies array if you'd like to load a module by name.
- `Loader.load()` can take an array of several module-helpers instead of chaining them one-by-one.
- `Loader.load()` can take a string as the first argument representing the provider type and its value as the second argument, just like the [$provide](https://docs.angularjs.org/api/auto/service/$provide) service.

### Provider

Used to define a new [provider](https://docs.angularjs.org/guide/providers).

```js
import { Provider } from 'angular-ecmascript/module-helpers';

class MomentProvider extends Provider {
  static $name = '$now'

  $get() {
    return new Date().getTime();
  }
}
```

### Service

Used to define a new [service](https://docs.angularjs.org/guide/services).

```js
import { Service } from 'angular-ecmascript/module-helpers';

class DateService extends Service {
  static $name = '$date'

  now() {
    return new Date().getTime();
  }
}
```

### Factory

Used to define a new `factory`.

- Note that the `create` method must be implemented, otherwise an error will be thrown during load time.

```js
import { Factory } from 'angular-ecmascript/module-helpers';

class MomentFactory extends Factory {
  static $name = 'now'

  create() {
    return new Date().getTime();
  }
}
```

### Controller

Used to define a new [controller](https://docs.angularjs.org/guide/controller).

- `$scope` will be injected automatically so no need to specify it.
- When using [angular-meteor](https://github.com/Urigo/angular-meteor) the controller will be set as the view model automatically.

```js
import { Controller } from 'angular-ecmascript/module-helpers';

class MyController extends Controller {
  constructor(...args) {
    super(...args);

    this.createdAt = new Date().getTime();
  }

  logCreationTime() {
    console.log(`created at: ${this.createdAy}`);
  }
}
```

### Directive

Used to define a new [directive](https://docs.angularjs.org/guide/directive).

```js
import { Directive } from 'angular-ecmascript/module-helpers';

class MyDirective extends Directive {
  templateUrl: 'my-template.html'
  restrict = 'E'
  transclude = true
  scope = {}

  link(scope) {
    scope.foo = 'foo';
    scope.bar = 'bar';
  }
}
```

### Decorator

Used to define a new [decorator](https://docs.angularjs.org/guide/decorators).

- `$delegate` will be injected automatically so no need to specify it.
- Note that the `decorate` method must be implemented, otherwise an error will be thrown during load time.
- No need to return the `$delegate` object, it should be handled automatically.

```js
import { Decorator } from 'angular-ecmascript/module-helpers';

class MyDecorator extends Decorator {
  static $name = 'myService'

  helperFn() {
    // an additional fn to add to the service
  }

  decorate() {
    this.$delegate.aHelpfulAddition = this.helperFn;
  }
}
```

### Filter

Used to define a new [filter](https://docs.angularjs.org/guide/filter).

- Note that the `filter` method must be implemented, otherwise an error will be thrown during load time.

```js
import { Filter } from 'angular-ecmascript/module-helpers';

class MyFilter extends Filter {
  filter(input = '', uppercase) {
    let out = '';

    for (let i = 0; i < input.length; i++) {
      out = input.charAt(i) + out;
    }

    // conditional based on optional argument
    if (uppercase) {
      out = out.toUpperCase();
    }

    return out;
  }
}
```

### Config

Used to define a new `config`.

- Note that the `configure` method must be implemented, otherwise an error will be thrown during load time.

```js
import { Config } from 'angular-ecmascript/module-helpers';

class RoutesCfg extends Config {
  static $inject = ['$routeProvider']

  constructor(...args) {
    super(...args);

    this.fetchUser = ['http', this::this.fetchUser];
  }

  configure() {
    this.$routeProvider
      .when('/', {
        template: '<home user="$resolve.user"></home>',
        resolve: {
          user: this.fetchUser
        }
      });
  }

  fetchUser($http) {
    return $http.get('...');
  }
}
```

### Runner

Used to define a new `run block`.

- Note that the `run` method must be implemented, otherwise an error will be thrown during load time.

```js
import { Runner } from 'angular-meteor/module-helpers';

class RoutesRunner extends Runner {
  static $inject = ['$rootScope', '$state']

  run() {
    this.$rootScope.$on('$stateChangeError', (...args) => {
      const [,,, err] = args;

      if (err === 'AUTH_REQUIRED') {
        this.$state.go('login');
      }
    });
  }
}
```

## Download

The source is available for download from [GitHub](http://github.com/DAB0mB/angular-ecmascript). Alternatively, you can install using Node Package Manager (`npm`):

    npm install angular-ecmascript
