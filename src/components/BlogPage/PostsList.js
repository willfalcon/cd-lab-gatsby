import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Img from 'gatsby-image/withIEPolyfill';

import { media } from '../theme';

const PostsList = ({ posts }) => {
  return (
    <>
      <SideBackground className="posts-list-background" />
      <StyledPostsList className="posts-list">
        {posts.map(({ id, title, mainImage, slug, publishedAt, author }) => {
          return (
            <li key={id} className="post">
              <Link to={`/post/${slug.current}`} className="post__link">
                <div className="post__info">
                  <span className="date">{publishedAt}</span>
                  <h2 className="post__title">{title}</h2>
                  <span className="author">by {author.name}</span>
                </div>
                <div className="side">
                  {mainImage && (
                    <Img
                      className="post__image"
                      fluid={mainImage.asset.fluid}
                      alt={mainImage.alt}
                      objectFit="contain"
                      objectPosition="left"
                    />
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </StyledPostsList>
    </>
  );
};

const StyledPostsList = styled.ul`
  list-style: none;
  padding: 0;

  .post {
    border-bottom: 2px solid ${({ theme }) => theme.orange};
    margin-bottom: 2rem;
    &__link {
      display: flex;
      text-decoration: none;
      color: ${({ theme }) => theme.dark};
      flex-direction: column;
    }
    &__info {
      order: 2;
    }
    &__image {
      /* display: block; */
      margin: 0 auto;
    }
  }

  .side {
    order: 1;
  }

  ${media.break`
    position: relative;
    
    .post {
      border: 0;
      /* margin: 0; */
      &__link {
        align-items: center;
        min-height: 200px;
        flex-direction: row;

      }
      &__info {
        flex: 0 0 50%;
        order: 1;
      }
      &__image {
        /* display: initial; */
        margin: 0;
        height: 300px;
        /* width: auto; */
      }
    }

    .side {
      flex: 0 0 50%;
      order: 2;
    }
  `}
`;

const SideBackground = styled.div`
  ${media.break`
    width: 40%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background-color: ${({ theme }) => theme.orange};
  `}
`;

export default PostsList;
