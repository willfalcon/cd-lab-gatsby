import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import useSiteContext from '../SiteContext';
import Content from '../Content';
import { media } from '../theme';
import Image from '../Image';

import { useOnScreen, useElementSize } from '../hooks';
import BlockTitle from '../BlockTitle';

const WhatWeDoTopic = ({ id, active, titleRef, whatWeDoImage, title, _rawShortContent, setActiveTopic, collection, index }) => {
  const { viewport } = useSiteContext();
  const [ref, size] = useElementSize();
  const [imageWrapperRef, imageWrapperSize] = useElementSize();
  const aspectRatio = whatWeDoImage.asset.metadata.dimensions.aspectRatio;

  const { isOnScreen } = useOnScreen(ref, '0px', { threshold: 1 });

  useEffect(() => {
    if (!active && isOnScreen) {
      setActiveTopic(id);
    }
  }, [isOnScreen]);

  return (
    <StyledTopic key={id} className="topic" viewport={viewport} title={titleRef} ref={ref} data={{ size, aspectRatio, active }}>
      <BlockTitle className="topic__title color-orange" styles={{ textAlign: 'left' }}>
        {title}
      </BlockTitle>
      <Content className="topic__content">{_rawShortContent}</Content>
      <Link className="topic__link" to={`/collection/${collection.slug.current}`}>
        View {title} Projects
      </Link>
      <div className="topic__image-wrapper" ref={imageWrapperRef}>
        {whatWeDoImage && <Image className="topic__image" image={whatWeDoImage} containerWidth={imageWrapperSize.width} index={index} />}
      </div>
    </StyledTopic>
  );
};

const StyledTopic = styled.div`
  opacity: ${({ data: { active } }) => (active ? 1 : 0.5)};
  transition: 0.25s;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, auto);
  .topic {
    &__title {
      font-size: 4rem;
      grid-row: 1 / 2;
      margin-bottom: 2rem;
    }
    &__link {
      color: ${({ theme }) => theme.orange};
      text-decoration: none;
      font-weight: bold;
      font-family: ${({ theme }) => theme.font.heading};
      font-size: 2rem;
      padding-bottom: 5rem;
      display: block;
    }
    &__image-wrapper {
      height: ${({ data: { aspectRatio, size } }) => size.width / aspectRatio}px;
      grid-row: 2 / 3;
    }
  }
  ${media.break`
    display: grid;
    grid-template-columns: 2fr 3fr;
    grid-template-rows: auto auto auto;
    align-items: center;
    grid-column-gap: 8rem;
    .topic {
      &__title {
        grid-row: 1 / 2;
        grid-column: 1 / 2;
        padding-top: 5rem;
        margin-bottom: 0;
      }
      &__content {
        grid-row: 2 / 3;
        grid-column: 1 / 2;
        padding-right: 5rem;
      }
      &__link {
        grid-row: 3 / 4;
        grid-column: 1 / 2;
        
      }
      &__image-wrapper {
        grid-row: 1 / 4;
        grid-column: 2 / 3;
        overflow: hidden;
        width: 100%;
        height: ${({ data: { size } }) => size.height}px;
        margin-bottom: 5rem;
      }
      &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

  `}
`;
export default WhatWeDoTopic;
