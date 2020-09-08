import React from "react";
import { Form, Message, Button, Input, TextArea } from "semantic-ui-react";
import { useTextFormField, useEmailFormField } from "../hooks/useFormFields";
import {
  CustomFormContainerSm,
  CustomFormTitle,
  CustomFormSubText,
} from "./common/styles";
import axios from "axios";
import { axiosHeaders } from "../axiosOptions";
import routes from "../routes";

const ContactView = () => {
  const [name, setName, nameError, , handleNameChange] = useTextFormField("");
  const [email, setEmail, emailError, , handleEmailChange] = useEmailFormField(
    ""
  );
  const [
    message,
    setMessage,
    messageError,
    ,
    handleMessageChange,
  ] = useTextFormField("");
  const [formSuccess, setFormSuccess] = React.useState(false);
  const [formError, setFormError] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    postContact();
  };

  const postContact = () => {
    axios
      .post(routes.api.contacts.create, { name, email, message }, axiosHeaders)
      .then(() => handlePostSuccess())
      .catch((error) => handlePostFailure(error));
  };
  const handlePostSuccess = () => {
    setName("");
    setEmail("");
    setMessage("");
    setFormSuccess(true);
  };
  const handlePostFailure = () => setFormError(true);
  return (
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
        {formSuccess && (
          <Message
            success
            header="Message Sent!"
            content="We'll get back to you as soon as possible"
          />
        )}
        {formError && (
          <Message
            success
            header="Something went Wrong!"
            content="Please try again later"
          />
        )}
        <Form.Field
          control={Input}
          label="Name"
          type="text"
          name="name"
          error={!nameError ? false : nameError}
          placeholder="Enter your name"
          required
          value={name}
          onChange={handleNameChange}
        />
        <Form.Field
          control={Input}
          label="Email"
          type="text"
          name="email"
          error={!emailError ? false : emailError}
          placeholder="Enter your email address"
          required
          value={email}
          onChange={handleEmailChange}
        />
        <Form.Field
          control={TextArea}
          label="Message"
          type="text"
          name="message"
          error={!messageError ? false : messageError}
          placeholder="Enter your message"
          required
          value={message}
          onChange={handleMessageChange}
        />
        <Button type="submit" primary>
          Send
        </Button>
      </Form>
    </CustomFormContainerSm>
  );
};

export default ContactView;
