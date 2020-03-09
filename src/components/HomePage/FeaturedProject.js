import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import Img from 'gatsby-image/withIEPolyfill';
import { Link } from 'gatsby';

import { media } from '../theme';

const FeaturedProject = ({ project, service }) => {
  const image = project.images[0];
  return (
    <StyledProject className="featured-project">
      <ProjectImage
        className="featured-project__image"
        fluid={image.asset.fluid}
        objectFit="cover"
      />
      <ProjectContent className="featured-project__content">
        <Link
          className="featured-project__service-link"
          to={`/service/${service.slug.current}/${project.slug.current}`}
        >
          <ProjectServiceName className="featured-project__service-name">
            {service.title}
          </ProjectServiceName>
        </Link>
        <Link to={`/service/${service.slug.current}/${project.slug.current}`}>
          <ProjectTitle className="featured-project__title">
            {project.title}
          </ProjectTitle>
        </Link>
        <Link
          className="featured-project__link"
          to={`/service/${service.slug.current}`}
        >
          Learn More >
        </Link>
      </ProjectContent>
    </StyledProject>
  );
};

const ProjectServiceName = styled.h3`
  line-height: 1.5;
`;
const ProjectTitle = styled.h2`
  text-transform: none;
`;
const ProjectContent = styled.div`
  width: 50%;
  padding: 1rem;
  height: 100%;
  background-color: ${({ theme }) => rgba(theme.lightOrange, 0.8)};
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  ${media.break`
    /* width: 40%; */
    max-width: 50%;
    padding: 2.7rem 2.2rem;
  `}
  a {
    text-decoration: none;
    color: white;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 1.4rem;
  }
`;

const ProjectImage = styled(Img)`
  width: 100%;
  height: 100%;
`;

const StyledProject = styled.div`
  background-image: url(${({ projectBG }) => projectBG});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 75vw;
  ${media.break`
    height: 100%;
  `}
  .featured-project {
    &__title {
      ${media.break`
        font-size: 2.4rem;
        line-height: 1.1;
        cursor: pointer;
      `}
    }
  }
`;

export default FeaturedProject;
