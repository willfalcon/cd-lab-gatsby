import React from 'react';
import { StyledForm } from './ContactFormStyles';
import classNames from 'classnames';

import Button from '../Button';
import Heading from '../Heading';
import Loader from '../Loader';
import { SiteContext } from '../SiteContext';

class ContactForm extends React.Component {
  state = {
    org: {
      value: '',
      input: false,
    },
    name: {
      value: '',
      input: false,
    },
    email: {
      value: '',
      input: false,
    },
    phone: {
      value: '',
      input: false,
    },
    message: {
      value: '',
      input: false,
    },
    submitting: false,
    success: false,
    error: false,
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;

    this.setState({
      [name]: {
        value: val,
        input: true,
      },
    });
  };

  handleFocus = e => {
    const { name } = e.target;
    this.setState({ [name]: { input: true } });
  };

  handleBlur = e => {
    const { name, value } = e.target;
    if (!value) {
      this.setState({ [name]: { input: false } });
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ submitting: true, error: false });

    const { org, name, email, phone, message } = this.state;

    const entry = await fetch(
      'https://api.creativedistillery.com/submit-entry',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          org: org.value,
          name: name.value,
          email: email.value,
          phone: phone.value,
          message: message.value,
        }),
      }
    );

    const entryJSON = await entry.json();

    if (entryJSON.error) {
      this.setState({
        error: entryJSON.error,
        success: false,
        submitting: false,
      });
    } else {
      this.setState({ success: true });
      this.setState({ submitting: false });
      setTimeout(() => this.props.toggleForm(), 5000);
    }

    // gtag('event', 'Form Submit', {
    //   event_category: 'Form',
    //   event_label: 'Contact Form'
    // });
  };

  render() {
    const { formOpen, toggleForm, modal = false, className } = this.props;
    const { success, submitting, error } = this.state;

    return (
      <SiteContext.Consumer>
        {({ formOptions: { errorMessage, successMessage }, mobile }) => (
          <StyledForm
            className={classNames('contact-form', className)}
            formOpen={formOpen}
            onSubmit={this.handleSubmit}
            modal={modal}
          >
            <Heading heading="Contact Us" />
            {error && <p>{errorMessage}</p>}
            {success ? (
              <p>{successMessage}</p>
            ) : (
              <fieldset
                disabled={submitting}
                aria-busy={submitting}
                className="contact-form__fieldset"
              >
                <label
                  htmlFor="org"
                  className={`field-text ${
                    this.state.org.input ? 'focused' : ''
                  }`}
                >
                  <span>Organization Name</span>
                  <input
                    type="text"
                    id="org"
                    name="org"
                    required
                    value={this.state.org.value}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                  />
                </label>
                <label
                  htmlFor="name"
                  className={`field-text ${
                    this.state.name.input ? 'focused' : ''
                  }`}
                >
                  <span>Contact Person</span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={this.state.name.value}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                  />
                </label>
                <label
                  htmlFor="email"
                  className={`field-text field-email ${
                    this.state.email.input ? 'focused' : ''
                  }`}
                >
                  <span>Email</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={this.state.email.value}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                  />
                </label>
                <label
                  htmlFor="phone"
                  className={`field-text field-phone ${
                    this.state.phone.input ? 'focused' : ''
                  }`}
                >
                  <span>Phone Number</span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={this.state.phone.value}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                  />
                </label>
                <label
                  htmlFor="message"
                  className={`field-text field-textarea ${
                    this.state.message.input ? 'focused' : ''
                  }`}
                >
                  <span className="message-span">Message</span>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={this.state.message.value}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                  />
                </label>
                <div className="buttons">
                  <Button type="submit" title="Send" />
                  {(!this.props.inNav || mobile) && (
                    <Button
                      title="Cancel"
                      handleClick={() => toggleForm(!formOpen)}
                      className="cancel"
                    />
                  )}
                  {submitting && <Loader />}
                </div>
              </fieldset>
            )}
          </StyledForm>
        )}
      </SiteContext.Consumer>
    );
  }
}

ContactForm.defaultProps = {
  inNav: false,
};

export default ContactForm;
