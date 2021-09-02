import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { animated, useSpring, useTransition } from 'react-spring';
import styled from 'styled-components';
import classNames from 'classnames';
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

import { useElementSize, useHasEntered } from './hooks';
import { roundToNearest } from './utils';

const client = new sanityClient({
  projectId: 'sgba0i04',
  dataset: 'gatsby',
  useCdn: false,
});
const builder = imageUrlBuilder(client);
function imgUrl(source) {
  return builder.image(source);
}

async function getImage(image, containerWidth) {
  const body = { image, containerWidth };
  const res = await fetch(`/.netlify/functions/image`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const result = await res.json();

  return result;
}

const Image = ({ className, image, containerWidth }) => {
  const { asset, crop } = image;
  // console.log(image);
  const base64 = asset.metadata.lqip;
  const [src, setSrc] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [switched, setSwitched] = useState(false);
  const ref = useRef(null);
  const hasEntered = useHasEntered(ref);

  useEffect(() => {
    async function setImage() {
      const res = await getImage(image, containerWidth);
      setSrc(res.url);
    }
    if (hasEntered && !src) {
      setImage();
    }
    if (loaded) {
      setSwitched(true);
    }
  }, [loaded, hasEntered, containerWidth, image.asset.assetId]);

  const imageSpring = useSpring({ opacity: switched ? 1 : 0 });

  const imagePlaceholderTransition = useTransition(switched, null, {
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <ImageWrapper className={classNames('cdhq-image', className)} ref={ref}>
      <animated.img
        className="cdhq-image__image"
        src={src}
        alt={image.alt}
        onLoad={() => {
          setLoaded(true);
        }}
        style={imageSpring}
      />
      {imagePlaceholderTransition.map(
        ({ item, key, props }) =>
          !item && (
            <animated.img
              key={key}
              className="cdhq-image__placeholder"
              src={base64}
              alt={image.alt}
              style={props}
            />
          )
      )}
    </ImageWrapper>
  );
};

const ImageWrapper = styled.div`
  position: relative;
  .cdhq-image {
    &__image {
      position: absolute;
      top: 0;
      left: 0;
    }
    &__placeholder {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const Box = styled.div`
  position: absolute;
  width: ${({ size }) => size.width}px;
  height: 100%;
  top: 0;
  left: 0;
  background: blue;
`;

export default Image;
