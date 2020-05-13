import React from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { media, grid } from '../theme';

const HomeFooter = () => {
  const { file, sanityHomePage } = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "cd-icon-reverse.png" }) {
        id
        childImageSharp {
          fixed(width: 100) {
            base64
            width
            height
            src
            srcSet
            srcWebp
            srcSetWebp
          }
        }
      }
      sanityHomePage {
        footerMenuHeading
        footerMenu {
          ... on SanityCategory {
            id
            title
            slug {
              current
            }
            _type
          }
          ... on SanityCollection {
            id
            _type
            title
            slug {
              current
            }
          }
          ... on SanityPost {
            id
            title
            slug {
              current
            }
            _type
          }
        }
      }
    }
  `);
  console.log(sanityHomePage);
  return (
    <Footer className="home-footer">
      <Img
        className="home-footer__icon"
        fixed={file.childImageSharp.fixed}
        alt="Creative Distillery Icon"
      />
      <div className="home-footer__column home-footer__contact">
        <h3 className="home-footer__contact-label">Contact</h3>
        <a className="home-footer__phone" href="tel:(601) 326-2388">
          601.326.2388
        </a>
        <p className="home-footer__address">
          3000 Old Canton Rd.
          <br />
          Suite 455
          <br />
          Jackson, MS 39216
        </p>
        <a
          className="home-footer__email"
          href="mailto:info@creativedistillery.com"
        >
          info@creativedistillery.com
        </a>
      </div>
      <div className="home-footer__column home-footer__menu">
        <h4 className="home-footer__small-heading home-footer__menu-heading">
          {sanityHomePage.footerMenuHeading}
        </h4>
        <nav className="home-footer__nav">
          {sanityHomePage.footerMenu.map(({ _type, title, slug, id }) => {
            const path = _type === 'category' ? 'service' : _type;
            return (
              <Link
                className="home-footer__nav-item"
                key={id}
                to={`/${path}/${slug.current}`}
              >
                {title}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="home-footer__column home-footer__topics">
        <h4 className="home-footer__small-heading home-footer__topics-heading">
          What We Do
        </h4>
        <ul className="home-footer__topics-list">
          <li className="home-footer__topic">
            <Link className="home-footer__topic-link" to="/">
              Strategy >
            </Link>
          </li>
          <li className="home-footer__topic">
            <Link className="home-footer__topic-link" to="/">
              Creative >
            </Link>
          </li>
          <li className="home-footer__topic">
            <Link className="home-footer__topic-link" to="/">
              Marketing >
            </Link>
          </li>
        </ul>
      </div>
    </Footer>
  );
};

const Footer = styled.footer`
  padding: 2rem;
  background: ${({ theme }) => theme.darkBlue};
  color: white;
  display: flex;
  flex-flow: row wrap;

  ${media.break`
    flex-flow: row nowrap;
    ${grid.enabled`
      display: grid;
      grid-template-columns: 100px 1fr 1fr 1fr;
      grid-column-gap: 3rem;
    `}
  `}
  a {
    color: white;
    text-decoration: none;
  }

  .home-footer {
    &__icon {
      flex: 0 0 100px;
    }
    &__column {
      padding: 4rem 1rem;
      flex: 0 0 30%;
    }
    &__contact-label {
      font-family: ${({ theme }) => theme.font.heading};
      color: ${({ theme }) => theme.orange};
      font-weight: ${({ theme }) => theme.font.black};
      font-size: 6rem;
      line-height: 1.2;
      text-transform: none;
    }
    &__contact {
      font-family: ${({ theme }) => theme.font.heading};
      font-size: 2.6rem;
      line-height: 1.2;
      > * {
        margin-bottom: 2rem;
        display: block;
      }
      p {
        font-size: 2.6rem;
        line-height: 1.2;
      }
    }
    &__small-heading {
      font-family: ${({ theme }) => theme.font.heading};
      color: ${({ theme }) => theme.orange};
      font-weight: ${({ theme }) => theme.font.black};
      line-height: 1;
      text-transform: none;
      font-size: 3rem;
      margin-top: 0;
    }
    &__nav-item {
      font-family: ${({ theme }) => theme.font.heading};
      font-size: 2.2rem;
      line-height: 1.4;
      display: block;
      margin-bottom: 2rem;
    }
    &__topics-list {
      padding: 0;
      margin: 0;
      list-style: none;
    }
    &__topic-link {
      font-family: ${({ theme }) => theme.font.heading};
      font-size: 2.2rem;
      line-height: 1.4;
      display: block;
      margin-bottom: 2rem;
    }
  }
`;

export default HomeFooter;
