import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { useTransition, animated } from 'react-spring';

const Project = ({
  image,
  hoverState,
  setHoverState,
  title,
  id,
  slug = false,
}) => {
  const overlayTransition = useTransition(hoverState === id, null, {
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
    <StyledProject
      onMouseEnter={() => setHoverState(id)}
      as={slug ? Link : 'button'}
      to={`/service/${slug.current}`}
    >
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
  display: block;
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
  text-align: center;
`;

const overlayStyles = css`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${rgba('white', 0.65)};
`;

const Overlay = styled(animated.span)`
  ${overlayStyles}
`;

const OverlayLink = styled(Link)`
  ${overlayStyles}
`;

export default Project;
