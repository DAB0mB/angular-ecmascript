import Angular from 'angular';
import Loader from 'angular-ecmascript/module-loader';

import './specs/loader.spec.js';
import './specs/module-helpers/injectable.spec';
import './specs/module-helpers/directive.spec';
import './specs/module-helpers/controller.spec';
import './specs/module-helpers/filter.spec';
import './specs/module-helpers/config.spec';
import './specs/module-helpers/factory.spec';
import './specs/module-helpers/service.spec';
import './specs/module-helpers/provider.spec';
import './specs/module-helpers/runner.spec';
import './specs/module-helpers/decorator.spec';

beforeEach(function() {
  this.module = Angular.module('angular-ecmascript-test', []);
  this.loader = new Loader(this.module);
});