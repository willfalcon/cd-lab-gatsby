import React from 'react';
import styled from 'styled-components';

import Heading from './Heading';
import Content from './Content';
import PostsList from './PostsList';

import { media } from './theme';

const BlogPage = ({ posts, title, _rawBody, perPage, pageContext }) => {
  return (
    <StyledBlogPage className="blog-page">
      <Heading>{title}</Heading>
      {_rawBody && <Content>{_rawBody}</Content>}
      <PostsList posts={posts} />
    </StyledBlogPage>
  );
};

const StyledBlogPage = styled.div`
  background-color: ${props => props.theme.offWhite};
  padding: 0.5rem 2rem;
  min-height: ${({ viewheight }) => viewheight - 65}px;

  ${media.break`
    padding: 5% 11rem;
    padding-right: 0;
    position: relative;
    display: block;
    .heading {
      position: sticky;
      top: 0;
      z-index: 1;
      width: 50%;
      background-color: ${props => props.theme.offWhite};
    }
  `}
`;

export default BlogPage;
