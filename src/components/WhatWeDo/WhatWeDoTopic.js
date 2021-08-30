import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

import useSiteContext from '../SiteContext';
import Content from '../Content';
import { media } from '../theme';

import { useOnScreen, useElementSize } from '../hooks';
import BlockTitle from '../BlockTitle';
import { Link } from 'gatsby';

const WhatWeDoTopic = ({
  id,
  active,
  titleRef,
  image,
  whatWeDoImage,
  title,
  _rawShortContent,
  setActiveTopic,
  collection,
}) => {
  const { viewport } = useSiteContext();
  // const ref = useRef();
  const [ref, size] = useElementSize();
  const { isOnScreen } = useOnScreen(ref, '0px', { threshold: 1 });
  // console.log(title, isOnScreen);
  useEffect(() => {
    if (!active && isOnScreen) {
      setActiveTopic(id);
      console.log(title);
    }
  }, [isOnScreen]);

  return (
    <StyledTopic
      key={id}
      className="topic"
      viewport={viewport}
      title={titleRef}
      active={active}
      ref={ref}
      size={size}
    >
      <BlockTitle className="topic__title color-orange" styles={{ textAlign: 'left' }}>
        {title}
      </BlockTitle>
      <Content className="topic__content">{_rawShortContent}</Content>
      <Link className="topic__link" to={`/collection/${collection.slug.current}`}>
        View {title} Projects
      </Link>
      <div className="topic__image-wrapper">
        {whatWeDoImage && <Img className="topic__image" fluid={whatWeDoImage.asset.fluid} />}
      </div>
    </StyledTopic>
  );
};

const StyledTopic = styled.div`
  position: relative;
  padding-bottom: 10vh;
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  transition: 0.25s;
  .topic {
    &__title {
      font-size: 4rem;
    }
  }
  ${media.break`
    display: grid;
    grid-template-columns: 2fr 3fr;
    grid-template-rows: auto 1fr 1fr;
    grid-column-gap: 8rem;
    .topic {
      &__title {
        grid-row: 1 / 2;
        grid-column: 1 / 2;
      }
      &__content {
        grid-row: 2 / 3;
        grid-column: 1 / 2;
        padding-right: 5rem;
      }
      &__link {
        grid-row: 3 / 4;
        grid-column: 1 / 2;
        color: ${({ theme }) => theme.orange};
        text-decoration: none;
        font-weight: bold;
        font-family: ${({ theme }) => theme.font.heading};
        font-size: 2rem;
      }
      &__image-wrapper {
        grid-row: 1 / 4;
        grid-column: 2 / 3;
        overflow: hidden;
        position: absolute;
        width: 100%;
        height: ${({ size }) => size.height}px;
        /* top: -10vh; */
      }
      &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

  `}
  &:first-child {
  }
  .topic {
    /* &__ */
  }
`;
export default WhatWeDoTopic;
