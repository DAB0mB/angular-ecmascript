function createClass(Child, Parent, proto) {
  proto = proto || {};

  if (isHash(Parent)) {
    proto = Parent;
    Parent = Object;
  }

  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
  extend(Child.prototype, proto);

  return Child;
};

function extend(dst, src) {
  getKeys(src).forEach(function(k) {
    dst[k] = src[k];
  });

  return dst;
};

function hasValue(obj, v) {
  return getValues(obj).indexOf(v) != -1;
};

function hasKey(obj, k) {
  return getKeys(obj).indexOf(k) != -1;
};

function getValues(obj) {
  return getKeys(obj).map(function(k) {
    return obj[k];
  });
};

function getKeys(obj) {
  return Object.keys(obj);
};

function toArray(obj) {
  return [].slice.call(obj);
};

function isHash(obj) {
  return obj.__proto__ === Object.prototype;
}

function isString(str) {
  return typeof str == 'string';
}

function isFunction(fn) {
  return typeof fn == 'function';
}

module.exports = {
  class: createClass,
  extend: extend,
  hasValue: hasValue,
  hasKey: hasKey,
  values: getValues,
  keys: getKeys,
  toArray: toArray,
  isHash: isHash,
  isString: isString,
  isFunction: isFunction
};