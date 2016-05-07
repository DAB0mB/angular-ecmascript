var Injectable = require('./injectable');
var Utils = require('../utils');

function Runner() {}

Utils.class(Runner, Injectable, {
  decorate: function() {
    throw Error('Runner#run() must be implemented');
  }
});

module.exports = Runner;