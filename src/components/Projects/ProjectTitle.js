import React from 'react';
import styled from 'styled-components';
import {rgba} from 'polished';
import { useTransition, animated } from 'react-spring';
import classNames from 'classnames';

import Caret from '../Caret';

const ProjectTitle = ({ className, styles, titleStyles, children, modal = false, hovering }) => {

  const caretTrans = useTransition(hovering, null, {
    from: {
      opacity: 0
    },
    enter: {
      opacity: 1
    },
    leave: {
      opacity: 0
    },
  })

  return (
    <StyledTitle className={classNames(className, 'project-title')} style={styles} modal={modal}>
      <animated.h3 style={titleStyles}>{children}</animated.h3>
      {caretTrans.map(({item, key, props}) => !modal && item && <Caret 
        key={key}
        color="white" 
        styles={props}
        pulse
        big
      />)}
    </StyledTitle>
  );
};

const StyledTitle = styled(animated.div)`
  position: absolute;
  width: 100%;
  ${({ modal }) => modal ? `
    top: 100%;
  ` : `
    bottom: 0;
  `}
  left: 0;
  background: ${({ theme }) => rgba(theme.orange, 0.75)};
  color: ${({ theme }) => theme.offWhite};
  margin-bottom: 0;
  text-align: center;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  justify-content: center;
  h3 {
    margin-bottom: 0;
  }
`;

export default ProjectTitle;