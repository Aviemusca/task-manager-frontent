import React from "react";
import { Form, Button, Input, TextArea } from "semantic-ui-react";
import { useTextFormField, useEmailFormField } from "../hooks/useFormFields";
import {
  CustomFormContainerSm,
  CustomFormTitle,
  CustomFormSubText,
} from "./common/styles";

const ContactView = () => {
  const [name, handleNameChange, nameError] = useTextFormField("");
  const [email, handleEmailChange, emailError] = useEmailFormField("");
  const [message, handleMessageChange, messageError] = useTextFormField("");

  //const validateForm = () =>
  //  fields.email.length > 0 && fields.message.length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Posted");
  };
  return (
    <CustomFormContainerSm>
      <CustomFormTitle>Drop us a line</CustomFormTitle>
      <CustomFormSubText>
        Feel free to get in touch about any queries!
      </CustomFormSubText>
      <Form id="contact-form" onSubmit={handleSubmit}>
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
