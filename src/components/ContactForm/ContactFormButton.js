import React, { useState, useRef } from 'react';
import { useTransition } from 'react-spring';
import { useStaticQuery, graphql } from 'gatsby';

import useSiteContext from '../SiteContext';
import Button from '../Button';
import ContactForm from './ContactForm';
import CloseButton from '../CloseButton';
import BackgroundOverlay from '../BackgroundOverlay';
import Form from '../Forms/Form';

const ContactFormButton = ({ children }) => {

  const FormData = useStaticQuery(graphql`
    {
      sanityForm {
        id
        title
        successMessage
        _rawDescription
        formBuilder {
          ... on SanityTextArea {
            _key
            _type
            fieldOptions {
              halfWidth
              required
            }
            name
          }
          ... on SanityTextField {
            _key
            _type
            fieldOptions {
              halfWidth
              required
            }
            name
          }
          ... on SanityCheckBoxes {
            _key
            _type
            name
            options
            fieldOptions {
              halfWidth
              required
            }
          }
          ... on SanityEmailField {
            _key
            _type
            name
            fieldOptions {
              halfWidth
              required
            }
          }
          ... on SanityRadioButtons {
            _key
            _type
            fieldOptions {
              halfWidth
              required
            }
            name
            options
          }
        }
      }
    }
  `);

console.log(FormData);
  const { sanityForm } = FormData;

  const buttonRef = useRef(null);

  const buttonRect = buttonRef.current
    ? buttonRef.current.getBoundingClientRect()
    : { width: 0, height: 0, x: 0, y: 0 };
  const { width, height, y, x } = buttonRect;

  const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;

  const { viewport, mobile } = useSiteContext();

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
              <BackgroundOverlay
                onClick={() => setOpen(false)}
                style={{
                  opacity: props.o.interpolate(o => o),
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
              <Form
                modal
                formOpen={true}
                toggleForm={() => setOpen(!open)}
                className="modal-contact-form"
                styles={props}
                fields={sanityForm.formBuilder}
                {...sanityForm}
              >
                <CloseButton handleClick={() => setOpen(false)} />
              </Form>
            </React.Fragment>
          )
      )}
    </>
  );
};



export default ContactFormButton;
