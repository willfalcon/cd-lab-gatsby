import React, { useState } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { useSpring, animated } from 'react-spring';

import Heading from '../Heading';
import Content from '../Content';

import theme, { media } from '../theme';
import useSiteContext from '../SiteContext';

const ProjectContent = ({ content, title, transitionStyles }) => {
  const { viewport } = useSiteContext();

  const [open, toggle] = useState(false);
  const width = Math.round(viewport.width * 0.3);
  const contentSpring = useSpring({
    width: open ? `${width}px` : '40px',
    maxHeight: open ? `${Math.round(viewport.height * 0.5)}px` : '40px',
    padding: open ? '2.5rem' : '0rem',
    overflow: open ? 'scroll' : 'hidden',
    color: open ? theme.offWhite : rgba(theme.offWhite, 0),
  });

  return (
    <StyledProjectContent
      style={{ ...contentSpring, ...transitionStyles }}
      className="project-content"
    >
      <Heading h2 color="offWhite" inheritColor>
        {title}
      </Heading>
      <Content>{content}</Content>
      <DescriptionButton
        onClick={() => toggle(!open)}
        open={open}
        aria-label="Show project description"
        className="project-content__button"
      >
        <span />
        <span />
      </DescriptionButton>
    </StyledProjectContent>
  );
};

const StyledProjectContent = styled(animated.div)`
  background: ${({ theme }) => rgba(theme.orange, 0.9)};
  color: ${({ theme }) => theme.offWhite};
  position: absolute;
  top: 30%;
  left: ${({ left }) => left}px;
  right: 0;
  transform: translateX(50%);
  max-height: 50%;
  .heading {
    font-size: 3rem;
  }
`;

const DescriptionButton = styled(animated.button)`
  ${media.break`
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    height: 40px;
    width: 40px;
    background: ${({ theme, open }) =>
      open ? 'transparent' : rgba(theme.orange, 0.9)};
    transition: .25s;
    /* transform: ${({ open }) => (open ? 'rotateY(0)' : 'rotateY(180deg)')}; */
    z-index: 1;
    border: 0;
    cursor: pointer;
    &:focus {
      outline: none;
    }
    span {
      position: absolute;
      display: block;
      background: ${({ theme }) => theme.offWhite};
      height: 4px;
      width: 25px;
      left: 50%;
      top: 50%;
      transition: .25s;
      &:nth-child(1) {
        transform: translate(-50%, -50%) ${({ open }) =>
          open ? 'rotate(1.375turn)' : 'rotate(.25turn)'};
      }
      &:nth-child(2) {
        transform: translate(-50%, -50%) ${({ open }) =>
          open ? 'rotate(1.125turn)' : 'rotate(0turn)'};
      }
      /* transform: ${({ open }) =>
        open ? 'rotate(1.125turn)' : 'rotate(0turn)'}; */
    }
  `}
`;

export default ProjectContent;
