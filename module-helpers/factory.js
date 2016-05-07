var Injectable = require('./injectable');
var Utils = require('../utils');

function Factory() {}

Utils.class(Factory, Injectable, {
  decorate: function() {
    throw Error('Factory#create() must be implemented');
  }
});

module.exports = Factory;