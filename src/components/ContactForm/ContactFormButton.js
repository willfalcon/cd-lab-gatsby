import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { useTransition, animated } from 'react-spring';

// import client from '../../lib/client';
// import media from '../media';
import { media } from '../theme';
import useSiteContext from '../SiteContext';
import Button from '../Button';
import ContactForm from './ContactForm';
import CloseButton from '../CloseButton';
import BackgroundOverlay from '../BackgroundOverlay';

const ContactFormButton = ({ children }) => {
  const buttonRef = useRef(null);

  // const [location, setLocation] = useState({ width: 0, height: 0, x: 0, y: 0 });

  const buttonRect = buttonRef.current
    ? buttonRef.current.getBoundingClientRect()
    : { width: 0, height: 0, x: 0, y: 0 };
  const { width, height, y, x } = buttonRect;

  // useEffect(() => {
  //   if (buttonRef.current) {
  //     setLocation(buttonRect);
  //   }
  // }, [width, height, y, x]);

  const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;

  const { viewport, mobile } = useSiteContext();

  // const mobile = viewport.width >= theme.sizes.break;

  const [open, setOpen] = useState(false);

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
      // opacity: 1,
      o: 0,
      position: 'absolute',
      zIndex: 8,
    },
    enter: {
      width: `${mobile ? viewport.width : viewport.width / 2}px`,
      height: `${mobile ? viewport.height : viewport.height * 0.75}px`,
      left: `${viewport.width * 0.5}px`,
      transform: `translateX(-50%)`,
      top: `${
        mobile ? scrollY : viewport.height / 2 - (viewport.height * 0.75) / 2
      }px`,
      paddingTop: '5rem',
      paddingBottom: '5rem',
      paddingLeft: mobile ? '0%' : '2rem',
      paddingRight: mobile ? '0%' : '2rem',
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

  const toggleForm = () => {
    // gtag('event', 'Form Opened', {
    //   event_category: 'Form',
    //   event_label: 'Contact Form',
    // });
    setOpen(!open);
  };

  return (
    <>
      <Button handleClick={toggleForm} ref={buttonRef}>
        {children}
      </Button>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <React.Fragment key={key}>
              {/* <ContactFormModal
                style={props}
                viewheight={viewport.height}
                className="contact-form-modal"
                onClick={() => setOpen(false)}
              >
                <ContactForm
                  modal
                  formOpen={true}
                  toggleForm={() => setOpen(!open)}
                  className="modal-contact-form"
                />
                <CloseButton handleClose={() => setOpen(false)} />
              </ContactFormModal> */}
              <BackgroundOverlay
                onClick={() => setOpen(false)}
                style={{
                  opacity: props.o.interpolate(o => o),
                }}
                className="contact-form-bg-overlay"
              />
              <ContactForm
                modal
                formOpen={true}
                toggleForm={() => setOpen(!open)}
                className="modal-contact-form"
                styles={props}
              >
                <CloseButton handleClick={() => setOpen(false)} />
              </ContactForm>
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
    .modal-contact-form {
      overflow: scroll;
      -ms-overflow-style: -ms-autohiding-scrollbar;
    }
  `}
`;

export default ContactFormButton;
