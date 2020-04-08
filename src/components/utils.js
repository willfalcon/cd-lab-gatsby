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
      height: e[a + 'Height'],
    };
  }
  return {
    width: undefined,
    height: undefined,
  };
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
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

async function getThumb(id) {
  const thumbnailsRes = await fetch(
    `https://api.vimeo.com/videos/${id}/pictures`,
    {
      headers: {
        Authorization: 'bearer cabd18ff9e594c5abe72ddbc5878aed1',
      },
    }
  );
  const thumbnails = await thumbnailsRes.json();
  return thumbnails.data[0].sizes[
    thumbnails.data[0].sizes.findIndex(size => size.width === 640)
  ].link;
}

function roundToDecimal(number, decimal) {
  var zeros = new String((1.0).toFixed(decimal));
  zeros = zeros.substr(2);
  var mul_div = parseInt('1' + zeros);
  var increment = parseFloat('.' + zeros + '01');
  if ((number * (mul_div * 10)) % 10 >= 5) {
    number += increment;
  }
  return Math.round(number * mul_div) / mul_div;
}

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = event => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

export {
  getViewport,
  getCurrentBreakpoint,
  unique,
  debounce,
  useWindowSize,
  getThumb,
  roundToDecimal,
  encode,
  useOnClickOutside,
};
