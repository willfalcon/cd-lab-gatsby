import React from 'react';
import { graphql } from 'gatsby';

import Wrapper from '../components/Wrapper';
import BlogPage from '../components/BlogPage/BlogPage';

const blog = ({ data, pageContext }) => {
  return (
    <Wrapper seo={data.sanityBlogPage.seoSettings} pageTitle={data.sanityBlogPage.title}>
      <BlogPage
        posts={data.allSanityPost.edges.map(edge => ({ ...edge.node }))}
        {...data.sanityBlogPage}
        {...pageContext}
      />
    </Wrapper>
  );
};

export const BlogQuery = graphql`
  query BlogQuery($skip: Int!, $limit: Int!) {
    allSanityPost(
      skip: $skip
      limit: $limit
      sort: { fields: publishedAt, order: DESC }
    ) {
      edges {
        node {
          id
          title
          _rawBody
          mainImage {
            alt
            asset {
              fluid(maxWidth: 533) {
                ...GatsbySanityImageFluid
              }
            }
          }
          slug {
            current
          }
          publishedAt(formatString: "MM.DD.YY")
          author {
            name
          }
        }
      }
    }
    sanityBlogPage(_id: { eq: "blogPage" }) {
      perPage
      seoSettings {
        metaDescription
        canonicalUrl
        title
      }
      title
      _rawBody
    }
  }
`;

export default blog;
