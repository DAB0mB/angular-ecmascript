var Injectable = require('./injectable');
var Utils = require('../utils');

function Provider() {}

Utils.class(Provider, Injectable, {
  $get: function() {
    throw Error('Provider#$get() must be implemented');
  }
});

module.exports = Provider;