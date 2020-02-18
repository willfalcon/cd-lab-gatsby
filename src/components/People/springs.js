import { useSpring, useTransition } from 'react-spring';

const useExpandButtonTransition = expanded => {
  return useTransition(expanded, null, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  });
};

const useImageSpring = (mobile, expanded, viewport, top, left, size) => {
  return useSpring(
    mobile
      ? expanded
        ? {
            transform: `translateX(${viewport.width / 2 -
              size / 2}) translateY(10px)`,
            left: `${viewport.width / 2 - (viewport.width * 0.75) / 2}px`,
            top: `${top + 20}px`,
            width: `${viewport.width * 0.75}px`,
            height: `${viewport.width * 0.75}px`,
          }
        : {
            transform: 'translateX(0) translateY(0)',
            left: `${left}px`,
            top: `${top}px`,
            width: `${size}px`,
            height: `${size}px`,
          }
      : {}
  );
};

const useBioTransition = (expanded, viewport, top, left, size) => {
  return useTransition(expanded, null, {
    from: {
      width: `${size}px`,
      maxHeight: `0px`,
      left: `${left}px`,
      top: `${top}px`,
      zIndex: 2,
      opacity: 0,
    },
    enter: {
      width: `${viewport.width}px`,
      maxHeight: `1000px`,
      left: `0px`,
      top: `${top}px`,
      zIndex: 2,
      opacity: 1,
    },
    leave: {
      width: `${size}px`,
      maxHeight: `0px`,
      left: `${left}px`,
      top: `${top}px`,
      zIndex: 1,
      opacity: 0,
    },
  });
};

export { useExpandButtonTransition, useImageSpring, useBioTransition };
