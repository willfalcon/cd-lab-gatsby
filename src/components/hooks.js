import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { getViewport } from './utils';
import theme from './theme';

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

function useOnScreen(ref, rootMargin = '0px', options) {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);
  const [hasEnteredScreen, setEnteredScreen] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
        if (entry.isIntersecting) {
          setEnteredScreen(true);
        }
      },
      {
        rootMargin,
        ...options,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.unobserve(ref.current);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return { isOnScreen: isIntersecting, hasEnteredScreen };
}

function useScrollLock() {
  useLayoutEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden';
    // Re-enable scrolling when component unmounts
    return () => (document.body.style.overflow = originalStyle);
  }, []); // Empty array ensures effect is only run on mount and unmount
}

const useSiteMetadata = () => {
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `);
  return site.siteMetadata;
};

function useScrollSnap(plusHeight = 0) {
  const container = useRef(null);
  useLayoutEffect(() => {
    const gatsbyContainer = document.getElementById('___gatsby');
    const viewport = getViewport();

    if (container.current && viewport.width >= theme.sizes.break) {
      const children = container.current.children;
      Array.from(children).forEach((child, i) => {
        const rect = child.getBoundingClientRect();
        // console.log(rect);
        const header = i === 0 ? 78 : 0;
        const scrollChild = document.createElement('div');
        scrollChild.style.width = `${rect.width}px`;
        scrollChild.style.height = `${rect.height + plusHeight + header}px`;
        // scrollChild.style.top = `${rect.top}px`;
        // scrollChild.style.left = `${rect.left}px`;
        scrollChild.style.position = 'relative';
        scrollChild.style.scrollSnapAlign = 'center';
        scrollChild.style.pointerEvents = 'none';
        scrollChild.classList.add('scroll-anchor');
        document.body.appendChild(scrollChild);
      });
      gatsbyContainer.style.position = 'absolute';
      gatsbyContainer.style.width = '100%';

      document.body.style.scrollSnapType = 'y proximity';
      document.body.style.height = '100vh';
      document.body.style.overflowY = 'scroll';
      document.body.style.position = 'relative';

      document.documentElement.style.height = '100vh';
      document.documentElement.style.overflow = 'hidden';
    }

    return () => {
      const scrollAnchors = document.querySelectorAll('.scroll-anchor');
      Array.from(scrollAnchors).forEach(el => el.parentNode.removeChild(el));
      gatsbyContainer.removeAttribute('style');
      document.body.removeAttribute('style');
      document.documentElement.removeAttribute('style');
    };
  }, []);
  return container;
}

const useElementSize = () => {
  const [elementSize, setElementSize] = useState({
    width: 0,
    height: 0,
  });

  const elementRef = useRef();

  useLayoutEffect(() => {
    if (elementRef.current) {
      trigger();
    }
  }, [elementRef.current]);

  const trigger = () => {
    const size = elementRef.current.getBoundingClientRect();
    setElementSize(size);
  };

  return [elementRef, elementSize, trigger];
};

export {
  useSiteMetadata,
  useWindowSize,
  useOnClickOutside,
  useOnScreen,
  useScrollLock,
  useScrollSnap,
  useElementSize,
};
