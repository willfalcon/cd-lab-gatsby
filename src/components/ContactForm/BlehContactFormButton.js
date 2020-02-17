import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { useTransition, animated } from 'react-spring';

import Button from '../Button';
import ContactForm from './ContactForm';
import CloseButton from '../CloseButton';
import BackgroundOverlay from '../BackgroundOverlay';

import useSiteContext from '../SiteContext';
import { media } from '../theme';

const ContactFormButton = ({ children }) => {
  const { viewport, mobile } = useSiteContext();
  const [open, setOpen] = useState(false);

  const toggleForm = () => {
    // gtag('event', 'Form Opened', {
    //   event_category: 'Form',
    //   event_label: 'Contact Form',
    // });
    setOpen(!open);
  };

  /**
   * Animation
   */

  const buttonRef = useRef(null);
  const [location, setLocation] = useState({ width: 0, height: 0, x: 0, y: 0 });

  const buttonRect = buttonRef.current
    ? buttonRef.current.getBoundingClientRect()
    : { width: 0, height: 0, x: 0, y: 0 };
  const { width, height, y, x } = buttonRect;

  useEffect(() => {
    if (buttonRef.current) {
      setLocation(buttonRect);
    }
  }, [width, height, y, x]);

  const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;

  const transitions = useTransition(open, null, {
    from: {
      width: `${width}px`,
      height: `${height}px`,
      left: `${x}px`,
      transform: `translateX(-0%)`,
      top: `${y}px`,
      paddingTop: '0rem',
      paddingBottom: '0rem',
      paddingLeft: '0%',
      paddingRight: '0%',
      opacity: 1,
      o: 0,
    },
    enter: {
      width: `${mobile ? viewport.width : viewport.width * 0.75}px`,
      height: `${viewport.height}px`,
      left: `${viewport.width * 0.5}px`,
      transform: `translateX(-50%)`,
      top: `${scrollY}px`,
      paddingTop: '5rem',
      paddingBottom: '5rem',
      paddingLeft: '0%',
      paddingRight: '0%',
      opacity: 1,
      o: 1,
    },
    leave: {
      width: `${width}px`,
      height: `${height}px`,
      left: `${x}px`,
      transform: `translateX(-0%)`,
      top: `${y}px`,
      paddingTop: '0rem',
      paddingBottom: '0rem',
      paddingLeft: '0%',
      paddingRight: '0%',
      opacity: 0,
      o: 0,
    },
  });

  return (
    <>
      <Button handleClick={toggleForm}>{children}</Button>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <React.Fragment key={key}>
              <ContactFormModal
                viewheight={viewport.height}
                className="contact-form-modal"
                style={props}
              >
                <ContactForm
                  modal
                  formOpen={true}
                  toggleForm={() => setOpen(!open)}
                />
                <CloseButton handleClick={() => setOpen(false)} />
              </ContactFormModal>
              <BackgroundOverlay
                onClick={() => setOpen(false)}
                style={{
                  opacity: props.o.interpolate(o => o),
                }}
              />
            </React.Fragment>
          )
      )}
    </>
  );
};

const ContactFormModal = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: ${({ viewheight }) => viewheight - 65}px;
  top: 65px;
  left: 0;
  z-index: 32;
  ${media.break`
    height: ${({ viewheight }) => viewheight}px;
    top: 0;
    /* background: ${({ theme }) => rgba(theme.dark, 0.65)}; */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5rem 8%;
    form {
      overflow: scroll;
      -ms-overflow-style: -ms-autohiding-scrollbar;
    }
  `}
`;

export default ContactFormButton;
