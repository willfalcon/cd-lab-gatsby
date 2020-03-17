import React from 'react';
import styled from 'styled-components';
import {rgba} from 'polished';
import { animated } from 'react-spring';
import classNames from 'classnames';

const ProjectTitle = ({ className, styles, titleStyles, children, modal = false }) => {
  return (
    <StyledTitle className={classNames(className, 'project-title')} style={styles} modal={modal}>
      <animated.h3 style={titleStyles}>{children}</animated.h3>
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