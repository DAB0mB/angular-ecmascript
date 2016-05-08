var Injectable = require('./injectable');
var Utils = require('../utils');

function Service() {}

Utils.class(Service, Injectable);

module.exports = Service;