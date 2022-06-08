import React from 'react';
import { graphql } from 'gatsby';

import Wrapper from '../components/Wrapper';
import BlogPage from '../components/BlogPage/BlogPage';
import Meta from '../components/Meta';

const category = ({ data, pageContext, location }) => {
  return (
    <Wrapper seo={data.sanityBlogPage.seoSettings} pageTitle={data.sanityBlogPage.title} location={location}>
      <Meta
        title={pageContext.catTitle}
        seo={data.sanityBlogPage.seoSettings}
        // image={data.sanityHomePage.aboutUsImage.asset.ogImage.src}
        location={location}
        url={`/category/${pageContext.category}`}
      />
      <BlogPage posts={data.allSanityPost.edges.map(edge => ({ ...edge.node }))} {...data.sanityBlogPage} {...pageContext} />
    </Wrapper>
  );
};

export const ArchiveQuery = graphql`
  query ArchiveQuery($skip: Int!, $limit: Int!, $category: String!) {
    allSanityPost(
      skip: $skip
      limit: $limit
      sort: { fields: publishedAt, order: DESC }
      filter: { categories: { elemMatch: { slug: { current: { eq: $category } } } } }
    ) {
      edges {
        node {
          id
          title
          _rawBody(resolveReferences: { maxDepth: 10 })
          mainImage {
            # alt
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
      _rawBody(resolveReferences: { maxDepth: 10 })
    }
  }
`;

export default category;
