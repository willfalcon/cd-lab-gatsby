import { useTransition } from 'react-spring';

const useModalTransition = (expandedProject, dimensions, exitSizes, viewport, setHoverState) => {
  const { exitWidth, exitHeight, exitTop, exitLeft } = exitSizes;
  const scrollY = expandedProject && expandedProject.scrollY ? expandedProject.scrollY : 0;
  return useTransition(expandedProject, {
    from: {
      opacity: 0,
      width: `${expandedProject ? expandedProject.location.width : 0}px`,
      height: `${expandedProject ? expandedProject.location.height : 0}px`,
      top: `${expandedProject ? expandedProject.location.top + scrollY : 0}px`,
      left: `${expandedProject ? expandedProject.location.left : 0}px`,
      title: 1,
    },
    enter: {
      opacity: 1,
      width: `${dimensions.width}px`,
      height: `${dimensions.height}px`,
      top: `${expandedProject ? viewport.height / 2 - dimensions.height / 2 + scrollY : 0}px`,
      left: `${expandedProject ? viewport.width / 2 - dimensions.width / 2 : 0}px`,
      title: 1,
    },
    leave: {
      opacity: 0,
      width: `${exitWidth}px`,
      height: `${exitHeight}px`,
      top: `${exitTop}px`,
      left: `${exitLeft}px`,
      title: 0,
    },
    onRest: (props, state) => {
      setHoverState(null);
    },
  });
};

export default useModalTransition;
