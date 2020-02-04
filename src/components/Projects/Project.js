import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { rgba } from 'polished';
import { useTransition, animated } from 'react-spring';

const Project = ({ image, hoverState, setHoverState, title }) => {
  const overlayTransition = useTransition(hoverState === image._key, null, {
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

  return (
    <StyledProject onMouseEnter={() => setHoverState(image._key)}>
      <ProjectImage fluid={image.asset.fluid} />
      {overlayTransition.map(({ item, key, props }) =>
        item ? (
          <StyledTitle className="project__title" key={key} style={props}>
            {title}
          </StyledTitle>
        ) : (
          <Overlay key={key} style={props} />
        )
      )}
    </StyledProject>
  );
};

const StyledProject = styled.button`
  width: 50%;
  background: white;
  border: 0;
  margin: 0;
  padding: 0;
  outline: none;
  cursor: pointer;
  position: relative;
`;

const ProjectImage = styled(Img)`
  width: 100% !important;
`;

const StyledTitle = styled(animated.h3)`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  background: ${({ theme }) => rgba(theme.orange, 0.75)};
  color: ${({ theme }) => theme.offWhite};
  margin-bottom: 0;
`;

const Overlay = styled(animated.span)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${({ theme }) => rgba('white', 0.65)};
`;

export default Project;
