import React from 'react';
import Img from 'gatsby-image';
import classNames from 'classnames';

import calculateStyles from './calculateStyles';

const FluidImg = props => {
  const { assetId, fluidOptions, fluid, hotspot, crop, className, alt } = props;
  // console.log(props);
  if (!assetId || !fluid) {
    return null;
  }
  // If you already have the fluid props from GraphQL, skip this step
  // const imgFluidProps = getFluidProps(assetId, fluidOptions);

  // If no hotspot or crop, we're good to go with regular GatsbyImage
  if (!hotspot && !crop) {
    return <Img alt={alt} fluid={fluid} className={classNames(className, 'cropped-gatsby-img-fluid')} />;
  }

  // If we do, however, let's get each element's styles to replicate the hotspot and crop
  const targetStyles = calculateStyles({
    container: {
      // aspectRatio: fluid.aspectRatio,
    },
    image: {
      aspectRatio: fluid.aspectRatio,
    },
    hotspot,
    crop,
  });
  // console.log({ targetStyles });
  // Unfortunately, as we need an extra wrapper for the image to apply the crop styles, we recreate a padding div and add it all to a new container div
  return (
    <div style={targetStyles.container}>
      <div aria-hidden="true" style={targetStyles.padding}></div>
      <Img
        fluid={fluid}
        alt={alt}
        className={className}
        // The GatsbyImage wrapper will have the crop styles
        style={targetStyles.crop}
        imgStyle={targetStyles.image}
      />
    </div>
  );
};

export default FluidImg;
