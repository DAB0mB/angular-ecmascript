var Injectable = require('./injectable');
var Utils = require('../utils');

function Provider() {}

Utils.class(Provider, Injectable);

module.exports = Provider;