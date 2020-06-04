import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import Img from 'gatsby-image';
import { Link } from 'gatsby';

import Heading from './Heading';
import Content from './Content';
import Topics from './Topics/Topics';
import NewsletterButton from './NewsletterButton';

import { media, grid } from './theme';

const Post = ({
  _rawBody,
  mainImage,
  title,
  author,
  publishedAt,
  categories,
}) => {
  return (
    <Article className="single-post">
      {mainImage && (
        <Img
          fluid={mainImage.asset.fluid}
          alt={mainImage.alt ? mainImage.alt : title}
          className="single-post__image"
        />
      )}
      <span className="date">{publishedAt}</span>
      <Heading>{title}</Heading>
      <Content>{_rawBody}</Content>
      <AuthorBio className="author">
        {author.image && (
          <Img
            className="author__image"
            fixed={author.image.asset.fixed}
            alt={author.name}
          />
        )}
        <h3 className="author__name">{author.name}</h3>
        {author._rawBio && (
          <Content className="author__bio">{author._rawBio}</Content>
        )}
      </AuthorBio>
      {categories.length > 0 && (
        <Categories className="post-categories">
          <h3 className="post-categories__heading">Filed under</h3>
          {categories.map(cat => {
            return (
              <Link
                className="category"
                to={`/category/${cat.slug.current}`}
                key={cat.id}
              >
                {cat.title}
              </Link>
            );
          })}
        </Categories>
      )}
      <NewsletterButton>Join our Newsletter</NewsletterButton>
      <Topics />
    </Article>
  );
};

const Categories = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 5rem;
  .post-categories__heading {
    flex: 100%;
  }
  .category {
    text-decoration: none;
    background: ${({ theme }) => theme.orange};
    color: ${({ theme }) => theme.offWhite};
    padding: 0 1.5rem;
    border-radius: 10rem;
    /* font-family: ${({ theme }) => theme.font.heading}; */
    font-weight: ${({ theme }) => theme.font.bold};
    margin-right: 1rem;
  }
`;

const Article = styled.article`
  padding: 1rem;
  width: 800px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 5rem;
  ${media.break`
    padding-top: 10rem;
  `}
  .date {
    display: block;
    margin-top: 3rem;
  }
  h1 {
    line-height: 1.25;
    margin-bottom: 3rem;
  }
`;

const AuthorBio = styled.div`
  margin-bottom: 2rem;
  margin-top: 2rem;
  background: ${({ theme }) => rgba(theme.dark, 0.25)};
  padding: 2rem;
  /* color: white; */
  .author {
    &__bio p {
      font-size: 1.6rem;
      line-height: 1.5;
    }
    &__name {
      font-size: 1.6rem;
      line-height: 1;
      margin-bottom: 1rem;
    }
  }
  ${media.break`
    ${grid.enabled`
      display: grid;
      grid-template-columns: 300px 1fr;
      grid-column-gap: 2rem;
      .author {
        &__image {
          grid-column: 1 / 2;
          grid-row: span 2;
        }
        &__name {
          grid-column: 2 / 3;
          grid-row: 1 / 2;
        }
        &__bio {
          grid-column: 2 / 3;
          grid-row: 2 / 3;
        }
      }
    `}
  `}
`;

export default Post;
