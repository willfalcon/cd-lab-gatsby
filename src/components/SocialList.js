import React from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { fab } from '@fortawesome/free-brands-svg-icons';
import classNames from 'classnames';

import useSiteContext from './SiteContext';
import { media } from './theme';

const SocialList = ({ className, styles }) => {
  const {
    social: { facebook, instagram, linkedin, twitter },
    menuOpen,
  } = useSiteContext();

  return (
    <StyledSocialList
      open={menuOpen}
      className={classNames('social-list', className)}
      style={styles}
    >
      {twitter && (
        <li>
          <a
            href={twitter}
            aria-label="Visit us on Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={['fab', 'twitter']} size="lg" />
          </a>
        </li>
      )}
      {instagram && (
        <li>
          <a
            href={instagram}
            aria-label="Visit us on Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={['fab', 'instagram']} size="lg" />
          </a>
        </li>
      )}
      {facebook && (
        <li>
          <a
            href={facebook}
            aria-label="Visit us on Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={['fab', 'facebook-f']} size="lg" />
          </a>
        </li>
      )}
      {linkedin && (
        <li>
          <a
            href={linkedin}
            aria-label="Visit us on LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={['fab', 'linkedin-in']} size="lg" />
          </a>
        </li>
      )}
    </StyledSocialList>
  );
};

const StyledSocialList = styled(animated.ul)`
  display: none;
  padding: 1rem 0;
  margin: 0;
  list-style: none;
  li {
    padding: 1.5rem 0;
    a:hover {
      svg {
        color: ${({ theme }) => theme.lightOrange};
      }
    }
  }
  svg {
    display: block;
    margin: 0 auto;
    transition: 0.25s;
    color: ${({ theme, open }) => (open ? 'white' : theme.orange)};
  }
  ${media.break`
    display: block;
    z-index: 5;
    position: fixed;
    top: 95px;
    left: 0;
    width: 75px;
  `}
`;

export default SocialList;
