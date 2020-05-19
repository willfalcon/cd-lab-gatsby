import React, { useState } from 'react';
import styled from 'styled-components';
import { useTransition, animated, interpolate } from 'react-spring';
import { rgba } from 'polished';

import Menu from './Menu';
import Button from '../Button';
import MobileFooter from '../MobileFooter';
import useSiteContext from '../SiteContext';
import theme, { media } from '../theme';
import Form from '../Forms/Form';

const Nav = ({ home }) => {
  const { viewport, menuOpen, toggleMenu, formOptions } = useSiteContext();
  const [formOpen, toggleForm] = useState(false);

  const navTransitionObject = {
    from: {
      scale: 0,
      translate: -75,
      o: 0,
    },
    enter: {
      scale: 1,
      translate: 0,
      o: 1,
    },
    leave: {
      scale: 0,
      translate: -75,
      o: 0,
    },
  };

  const mobile = viewport.width < theme.sizes.break;

  const navTransition = useTransition(menuOpen, null, navTransitionObject);

  const formTransition = useTransition(formOpen, null, {
    from: {
      maxHeight: '0%',
    },
    enter: {
      maxHeight: '100%',
    },
    leave: {
      maxHeight: '0%',
    },
  });

  return navTransition.map(
    ({ item, key, props: { scale, translate, o } }) =>
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
            home={home}
            style={{
              transform:
                viewport.width >= parseInt(theme.break, 10)
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
            {mobile && <MobileFooter />}
            {formTransition.map(
              ({ item, key, props }) =>
                (item || !mobile) && (
                  <NavFormWrap
                    key={key}
                    className="nav-form-wrap"
                    style={props}
                    open={formOpen}
                  >
                    <ContactForm
                      formOpen={formOpen}
                      toggleForm={toggleForm}
                      cancel={() => toggleForm(false)}
                      className="nav-form"
                      fields={formOptions.contactForm.formBuilder}
                      {...formOptions.contactForm}
                    />
                  </NavFormWrap>
                )
            )}
          </StyledNav>
        </React.Fragment>
      )
  );
};

const NavFormWrap = styled(animated.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  overflow: scroll;
  height: 100%;
  width: 100%;
  /* max-height: ${({ open }) => (open ? '100%' : '0')}; */
  /* transition: 0.15s; */
  .contact-form {
    height: 100%;
    bottom: 0;
  }
  ${media.break`
    position: initial;
    max-height: 100% !important;
    flex: 0 0 50%;
  `}
`;

const ContactForm = styled(Form)`
  overflow: hidden;
  flex: 0 0 50%;
  position: absolute;
  left: 0;
  bottom: 42px;
  ${media.break`
    max-height: 100vh;
    position: static;
    height: 100%;
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
      font-family: ${({ theme }) => theme.font.family};
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
    position: fixed;
    /* transform-origin: 0 100px; */
    transform-origin: 0 ${({ home }) => (home ? 0 : '100px')};
    ul {
      flex: 0 0 50%;
      height: 100%;
    }
  `}
`;

const NavBackdrop = styled(animated.div)`
  display: none;
  position: fixed;
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
