import { useSpring, useTransition } from 'react-spring';

import theme from '../theme';

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

const useImageSpring = (expanded, viewport, top, left, size, refPosition) => {
  const mobile = viewport.width < theme.sizes.break;
  const pos = refPosition;
  const expandedWidth =
    viewport.width * 0.75 * 0.5 > 400 ? 400 : viewport.width * 0.75 * 0.5;
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
      : pos
      ? expanded
        ? {
            top: `${viewport.height / 2 - expandedWidth / 2}px`,
            width: `${expandedWidth}px`,
            left: `${viewport.width * 0.75 -
              expandedWidth +
              viewport.width * 0.15}px`,
            height: `${expandedWidth}px`,
            zIndex: 8,
          }
        : {
            top: `${pos.top}px`,
            width: `${pos.width}px`,
            left: `${pos.left}px`,
            height: `${pos.height}px`,
            zIndex: 2,
          }
      : {}
  );
};

const useBioTransition = (expanded, viewport, top, left, size, refPosition) => {
  const mobile = viewport.width < theme.sizes.break;
  const pos = refPosition;
  return useTransition(
    expanded,
    null,
    mobile
      ? {
          from: {
            width: `${size}px`,
            maxHeight: `0px`,
            left: `${left}px`,
            top: `${top}px`,
            zIndex: 2,
            opacity: 0,
            o: 0,
          },
          enter: {
            width: `${viewport.width}px`,
            maxHeight: `1000px`,
            left: `0px`,
            top: `${top}px`,
            zIndex: 2,
            opacity: 1,
            o: 1,
          },
          leave: {
            width: `${size}px`,
            maxHeight: `0px`,
            left: `${left}px`,
            top: `${top}px`,
            zIndex: 1,
            opacity: 0,
            o: 0,
          },
        }
      : pos
      ? {
          from: {
            width: `${pos.width}px`,
            height: `${pos.height}px`,
            left: `${pos.left}px`,
            top: `${pos.top}px`,
            zIndex: 8,
            // opacity: 0,
            o: 0,
          },
          enter: {
            width: `${viewport.width * 0.75}px`,
            height: `${viewport.height * 0.75}px`,
            left: `75px`,
            top: `${viewport.height / 2 - (viewport.height * 0.75) / 2}px`,
            zIndex: 8,
            opacity: 1,
            o: 1,
          },
          leave: {
            width: `${pos.width}px`,
            height: `${pos.height}px`,
            left: `${pos.left}px`,
            top: `${pos.top}px`,
            zIndex: 0,
            opacity: 0,
            o: 0,
          },
        }
      : { from: { o: 0 }, enter: { o: 1 }, leave: { o: 0 } }
  );
};

export { useExpandButtonTransition, useImageSpring, useBioTransition };
