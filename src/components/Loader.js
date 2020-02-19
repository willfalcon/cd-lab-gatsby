import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

import theme from './theme';

const Loader = ({ className }) => {
  return (
    <StyledLoader className={classNames('loader', className)}>
      <FontAwesomeIcon icon={faCircleNotch} color={theme.dark} size="2x" />
    </StyledLoader>
  );
};

const LoaderKeyframes = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledLoader = styled.div`
  margin: 0 1rem;
  height: 32px;
  svg {
    animation: ${LoaderKeyframes} 1s cubic-bezier(0.46, 0.04, 0.6, 0.88)
      infinite;
  }
`;

export default Loader;
