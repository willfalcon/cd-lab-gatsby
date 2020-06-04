import React from 'react';
import { graphql } from 'gatsby';

import Wrapper from '../components/Wrapper';
import HomePage from '../components/HomePage/HomePage';
import OpenGraph from '../components/OpenGraph';

const index = ({ data, pageContext }) => {
  console.log(data);
  return (
    <Wrapper
      home
      seo={data.sanityHomePage.seoSettings}
      pageTitle={data.sanityHomePage.title}
    >
      <OpenGraph
        title="home"
        seo={data.sanityHomePage.seoSettings}
        image={data.sanityHomePage.aboutUsImage.asset.ogImage.src}
      />
      <HomePage {...data.sanityHomePage} thumbnail={pageContext.thumbnail} />
    </Wrapper>
  );
};

export const HomeQuery = graphql`
  query HomeQuery {
    sanityHomePage(_id: { eq: "homePage" }) {
      id
      title
      aboutUsImage {
        _key
        _type
        asset {
          mainImage: fluid(maxWidth: 2000) {
            ...GatsbySanityImageFluid
          }
          ogImage: fluid(maxWidth: 1080) {
            ...GatsbySanityImageFluid
          }
          assetId
        }
        crop {
          _type
          bottom
          left
          right
          top
        }
        hotspot {
          _type
          height
          width
          x
          y
        }
      }
      _rawBody(resolveReferences: { maxDepth: 10 })
      _rawNewBody(resolveReferences: { maxDepth: 10 })
      _rawAboutCopy(resolveReferences: { maxDepth: 10 })
      homeVideoId
      logoBadge {
        alt
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      seoSettings {
        canonicalUrl
        metaDescription
        title
      }
    }
  }
`;

export default index;
