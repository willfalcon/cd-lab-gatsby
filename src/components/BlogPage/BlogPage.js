import React from 'react';
import styled from 'styled-components';

import Heading from '../Heading';
import Content from '../Content';
import PostsList from './PostsList';
import Pagination from './Pagination';

import { media } from '../theme';

const BlogPage = ({ posts, title, _rawBody, perPage, numPages, currentPage, catTitle = false }) => {
  return (
    <StyledBlogPage className="blog-page">
      <main className="main">
        <Heading>{catTitle || title}</Heading>
        {_rawBody && <Content>{_rawBody}</Content>}
        <PostsList posts={posts} />
        <Pagination numPages={numPages} currentPage={currentPage} />
      </main>
    </StyledBlogPage>
  );
};

const StyledBlogPage = styled.div`
  padding: 0.5rem 2rem;
  /* min-height: ${({ viewheight }) => viewheight - 65}px; */

  ${media.break`
    padding: 0 11rem 5%;
    padding-right: 0;
    /* position: relative; */
    display: block;
    height: 100%;
    .main {
      position: relative;
    }
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
