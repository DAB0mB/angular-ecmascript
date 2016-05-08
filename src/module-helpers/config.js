var Injectable = require('./injectable');
var Utils = require('../utils');

function Config() {}

Utils.class(Config, Injectable, {
  decorate: function() {
    throw Error('Config#configure() must be implemented');
  }
});

module.exports = Config;