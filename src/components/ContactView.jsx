import React from "react";
import { Form, Message, Button, Input, TextArea } from "semantic-ui-react";
import { useFormFieldsWithErrors } from "../hooks/forms/useFormFields";
import { useFormValid } from "../hooks/forms/useFormValid";

import {
  CustomFormContainerSm,
  CustomFormTitle,
  CustomFormSubText,
} from "./common/styles";
import axios from "axios";
import { axiosHeaders } from "../axiosOptions";
import routes from "../routes";

const ContactViewContainer = () => {
  const initialFields = { name: "", email: "", message: "" };
  const initialFieldErrors = {
    nameError: "",
    emailError: "",
    messageError: "",
  };

  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [formSuccess, setFormSuccess] = React.useState(false);
  const [formError, setFormError] = React.useState(false);
  const [
    fields,
    setFields,
    errors,
    ,
    handleInputChange,
  ] = useFormFieldsWithErrors(
    initialFields,
    initialFieldErrors,
    formSubmitted,
    setFormSubmitted
  );
  const [formValid] = useFormValid(fields, errors);

  const handleSubmit = (event) => {
    setFormSubmitted(true);
    event.preventDefault();
    if (formValid) postContact();
  };

  const postContact = () => {
    axios
      .post(routes.api.contacts.create, fields, axiosHeaders)
      .then(() => handlePostSuccess())
      .catch((error) => handlePostFailure(error));
  };
  const handlePostSuccess = () => {
    setFields(initialFields);
    setFormSuccess(true);
  };
  const handlePostFailure = () => setFormError(true);
  return (
    <ContactView
      fields={fields}
      errors={errors}
      formSuccess={formSuccess}
      formValid={formValid}
      formError={formError}
      formSubmitted={formSubmitted}
      handleSubmit={handleSubmit}
      handleChange={handleInputChange}
    />
  );
};

const ContactView = ({
  fields,
  errors,
  formSuccess,
  formError,
  formValid,
  formSubmitted,
  handleSubmit,
  handleChange,
}) => (
  <CustomFormContainerSm>
    <CustomFormTitle>Drop us a line</CustomFormTitle>
    <CustomFormSubText>
      Feel free to get in touch about any queries!
    </CustomFormSubText>
    <Form
      id="contact-form"
      onSubmit={handleSubmit}
      success={formSuccess}
      error={formError}
    >
      {formSubmitted && (
        <FormMessages
          formSuccess={formSuccess}
          formError={formError}
          formValid={formValid}
        />
      )}

      <Form.Field
        control={Input}
        label="Name"
        type="text"
        name="name"
        error={!errors["nameError"] ? false : errors["nameError"]}
        placeholder="Enter your name"
        required
        value={fields["name"]}
        onChange={(event) =>
          handleChange(event, {
            errorName: "nameError",
            errorType: "textError",
            minChars: 3,
          })
        }
      />
      <Form.Field
        control={Input}
        label="Email"
        type="text"
        name="email"
        error={!errors["emailError"] ? false : errors["emailError"]}
        placeholder="Enter your email address"
        required
        value={fields["email"]}
        onChange={(event) =>
          handleChange(event, {
            errorName: "emailError",
            errorType: "emailError",
          })
        }
      />
      <Form.Field
        control={TextArea}
        label="Message"
        type="text"
        name="message"
        error={!errors["messageError"] ? false : errors["messageError"]}
        placeholder="Enter your message"
        required
        value={fields["message"]}
        onChange={(event) =>
          handleChange(event, {
            errorName: "messageError",
            errorType: "textError",
            minChars: 50,
          })
        }
      />
      <Button type="submit" primary>
        Send
      </Button>
    </Form>
  </CustomFormContainerSm>
);

const FormMessages = ({ formSuccess, formError, formValid }) => {
  return (
    <React.Fragment>
      {formSuccess && (
        <Message
          success
          header="Message Sent!"
          content="We'll get back to you as soon as possible"
        />
      )}
      {!formValid && (
        <Message
          negative
          header="Invalid Form Submission!"
          content="Please fill out all the required fields correctly"
        />
      )}
      {formError && formValid && (
        <Message
          negative
          header="Something went Wrong!"
          content="Please try again later"
        />
      )}
    </React.Fragment>
  );
};

export default ContactViewContainer;
