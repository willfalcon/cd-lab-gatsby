import React, { useState, useRef } from 'react';
import { useTransition } from 'react-spring';
// import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import Button from './Button';
// import ContactForm from './ContactForm';
import CloseButton from './CloseButton';
import BackgroundOverlay from './BackgroundOverlay';
import Form from './Forms/Form';

import useSiteContext from './SiteContext';
import { media } from './theme';

const FormModalButton = ({ children = 'Start a Project', form = null }) => {
  const buttonRef = useRef(null);

  const buttonRect = buttonRef.current
    ? buttonRef.current.getBoundingClientRect()
    : { width: 0, height: 0, x: 0, y: 0 };
  const { width, height, y, x } = buttonRect;

  const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;

  const { viewport, mobile, formOptions } = useSiteContext();

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
      o: 0,
      y: y,
      position: 'absolute',
      zIndex: 10,
    },
    enter: {
      width: `${mobile ? viewport.width : viewport.width / 2}px`,
      height: `${mobile ? viewport.height : viewport.height * 0.75}px`,
      left: `${viewport.width * 0.5}px`,
      transform: `translateX(-50%)`,
      top: `${
        mobile
          ? scrollY
          : viewport.height / 2 - (viewport.height * 0.75) / 2 + scrollY
      }px`,
      paddingTop: '5rem',
      paddingBottom: '5rem',
      paddingLeft: mobile ? '0%' : '2rem',
      paddingRight: mobile ? '0%' : '2rem',
      opacity: 1,
      o: 1,
      y: mobile
        ? scrollY
        : viewport.height / 2 - (viewport.height * 0.75) / 2 + scrollY,
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
      y: y,
    },
  });

  const toggleForm = () => {
    // gtag('event', 'Form Opened', {
    //   event_category: 'Form',
    //   event_label: 'Contact Form',
    // });
    setOpen(!open);
  };

  const fields = form ? form.formBuilder : formOptions.contactForm.formBuilder;

  const options = form ? form : formOptions.contactForm;
  return (
    <>
      <Button handleClick={toggleForm} ref={buttonRef}>
        {children}
      </Button>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <React.Fragment key={key}>
              <BackgroundOverlay
                onClick={() => setOpen(false)}
                style={{
                  opacity: props.o.interpolate(o => o),
                  height: '100%',
                }}
                className="contact-form-bg-overlay"
              />
              {/* <ContactForm
                modal
                formOpen={true}
                toggleForm={() => setOpen(!open)}
                className="modal-contact-form"
                styles={props}
              > */}
              <ContactForm
                modal
                formOpen={true}
                toggleForm={() => setOpen(!open)}
                className="modal-contact-form"
                styles={props}
                fields={fields}
                {...options}
              >
                <CloseButton handleClick={() => setOpen(false)} />
              </ContactForm>
            </React.Fragment>
          )
      )}
    </>
  );
};

const ContactForm = styled(Form)`
  overflow: hidden;
  flex: 0 0 50%;
  position: absolute;
  left: 0;
  bottom: 42px;

  overflow: scroll;
  ${media.break`
    max-height: 100vh;
    position: static;
    height: 100%;
  `}
`;

export default FormModalButton;
