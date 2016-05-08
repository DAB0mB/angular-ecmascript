var Injectable = require('./injectable');
var Utils = require('../utils');

function Filter() {}

Utils.class(Filter, Injectable, {
  decorate: function() {
    throw Error('Filter#filter() must be implemented');
  }
});

module.exports = Filter;