export function hasValue(obj, v) {
  return getValues(obj).indexOf(v) != -1;
};

export function hasKey(obj, k) {
  return getKeys(obj).indexOf(k) != -1;
};

export function getValues(obj) {
  return getKeys(obj).map(function(k) {
    return obj[k];
  });
};

export function getKeys(obj) {
  return Object.keys(obj);
};

export function isHash(obj) {
  return obj.__proto__ === Object.prototype;
}

export function isArray(arr) {
  return arr instanceof Array;
}

export function isString(str) {
  return typeof str == 'string';
}

export function isFunction(fn) {
  return typeof fn == 'function';
}