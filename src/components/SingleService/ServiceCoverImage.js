import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image/withIEPolyfill';

const ServiceCoverImage = ({ image }) => {
  return <CoverImage fluid={image} objectFit="cover" />;
};

const CoverImage = styled(Img)`
  flex: 0 0 60%;
`;

export default ServiceCoverImage;
