var Injectable = require('./injectable');
var Utils = require('../utils');

function Decorator() {}

Utils.class(Decorator, Injectable, {
  decorate: function() {
    throw Error('Decorator#decorate() must be implemented');
  }
});

module.exports = Decorator;