import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

import Heading from './Heading';
import Content from './Content';

const Post = ({ id, _rawBody, mainImage, title, author, publishedAt }) => {
  return (
    <Article>
      {mainImage && (
        <Img
          fluid={mainImage.asset.fluid}
          alt={mainImage.alt ? mainImage.alt : title}
        />
      )}
      <span className="date">{publishedAt}</span>
      <Heading>{title}</Heading>
      <Content>{_rawBody}</Content>
    </Article>
  );
};

const Article = styled.article`
  padding: 1rem;
  width: 800px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 5rem;
  .date {
    display: block;
    margin-top: 3rem;
  }

  h1 {
    line-height: 1.25;
    margin-bottom: 3rem;
  }
`;

export default Post;