import theme from './theme';
import { useState, useEffect } from 'react';

const getViewport = () => {
  if (typeof window === 'object') {
    var e = window,
      a = 'inner';
    if (!('innerWidth' in window)) {
      a = 'client';
      e = document.documentElement || document.body;
    }
    return {
      width: e[a + 'Width'],
      height: e[a + 'Height']
    };
  }
  return {
    width: undefined,
    height: undefined,
  }
};

const getCurrentBreakpoint = (width = getViewport().width) => {
  if (width >= theme.sizes.large) {
    return 'large';
  }
  if (width >= theme.sizes.break) {
    return 'break';
  }
  return 'small';
};

const unique = (value, index, self) => {
  return self.indexOf(value) === index;
};

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait = 250, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};


export { getViewport, getCurrentBreakpoint, unique, debounce };