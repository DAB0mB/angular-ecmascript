var Injectable = require('./injectable');
var Utils = require('../utils');

function Directive() {}

Utils.class(Directive, Injectable, {
  compile: function() {
    return this.link.bind(this);
  }
});

module.exports = Directive;