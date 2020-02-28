import React, { useState } from 'react';
import styled from 'styled-components';
import { useTransition, animated, interpolate } from 'react-spring';
import { rgba } from 'polished';
import Menu from './Menu';
import Button from '../Button';
import MobileFooter from '../MobileFooter';
import ContactForm from '../ContactForm/ContactForm';
import useSiteContext from '../SiteContext';
import theme, { media } from '../theme';

const Nav = () => {
  const { viewport, menuOpen, toggleMenu, setTopicZIndex } = useSiteContext();
  const [formOpen, toggleForm] = useState(false);

  const navTransitionObject = {
    from: {
      scale: 0,
      translate: -75,
      o: 0,
      zIndex: 14,
    },
    enter: {
      scale: 1,
      translate: 0,
      o: 1,
      zIndex: 14,
    },
    leave: {
      scale: 0,
      translate: -75,
      o: 0,
      zIndex: 14,
    },
    onRest: open => {
      if (open) {
        setTopicZIndex(11);
      }
      if (!open) {
        setTopicZIndex(13);
      }
    },
    onStart: open => {
      if (open) {
        setTopicZIndex(11);
      }
    },
  };

  const navTransition = useTransition(menuOpen, null, navTransitionObject);

  return navTransition.map(
    ({ item, key, props: { scale, translate, o, zIndex } }) =>
      item && (
        <React.Fragment key={key}>
          {viewport.width >= theme.sizes.break && (
            <NavBackdrop
              className="nav-backdrop"
              style={{ opacity: o }}
              onClick={toggleMenu}
              viewwidth={viewport.width}
              viewheight={viewport.height}
            />
          )}
          <StyledNav
            className="nav"
            viewheight={viewport.height}
            viewwidth={viewport.width}
            style={{
              transform:
                viewport.width >= theme.sizes.break
                  ? interpolate(
                      [scale, translate],
                      (scale, translate) =>
                        `translate(${translate}px, -50%) scale(${scale})`
                    )
                  : interpolate(
                      [scale, translate],
                      (scale, translate) =>
                        `translateY(${translate}px) scale(${scale})`
                    ),
              zIndex,
            }}
          >
            <Menu />
            <Button
              className="form-contact-button"
              handleClick={() => toggleForm(!formOpen)}
              big
            >
              Contact Us
            </Button>
            {viewport.width < theme.sizes.break && <MobileFooter />}
            <NavFormWrap className="nav-form-wrap" open={formOpen}>
              <ContactForm toggleForm={toggleForm} formOpen={formOpen} />
            </NavFormWrap>
          </StyledNav>
        </React.Fragment>
      )
  );
};

const NavFormWrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  overflow: hidden;
  height: 100%;
  width: 100%;
  max-height: ${({ open }) => (open ? '100%' : '0')};
  transition: 0.15s;
  .contact-form {
    height: 100%;
    bottom: 0;
  }
  ${media.break`
    position: initial;
    max-height: 100%;
    flex: 0 0 50%;
  `}
`;

const StyledNav = styled(animated.nav)`
  position: absolute;
  width: 100%;
  height: ${({ viewheight }) => viewheight - 65}px;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.dark};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transform-origin: top right;
  z-index: 9;
  .main-menu {
    /* flex-grow: 1; */
    margin: 0;
    list-style: none;
    padding: 2rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    .menu-item {
      a {
        text-decoration: none;
        font-size: 3.8rem;
        color: ${({ theme }) => theme.offWhite};
      }
      button {
        line-height: 2;
        color: ${({ theme }) => theme.offWhite};
      }
    }
    button,
    span {
      text-decoration: none;
      color: white;
      font-size: 3.8rem;
      border: 0;
      background: transparent;
      font-family: ${({ theme }) => theme.fontFamilySans};
      cursor: pointer;
    }
  }
  .form-contact-button {
    ${media.break`
      display: none;
    `}
  }

  ${media.break`
    width: ${({ viewwidth }) => viewwidth - 150}px;
    height: ${({ viewheight }) => viewheight - 125}px;
    left: 75px;
    top: ${({ viewheight }) => viewheight * 0.5}px;
    padding-top: 0;
    padding-bottom: 0;
    display: flex;
    flex-direction: row;
    position: absolute;
    transform-origin: 0 100px;
    ul {
      flex: 0 0 50%;
      height: 100%;
    }
  `}
`;

const NavBackdrop = styled(animated.div)`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  background: ${({ theme }) => rgba(theme.dark, 0.65)};
  width: ${({ viewwidth }) => viewwidth}px;
  height: ${({ viewheight }) => viewheight}px;
  transform-origin: 0 75px;
  ${media.break`
    display: block;
    z-index: 0;
  `}
`;

export default Nav;
