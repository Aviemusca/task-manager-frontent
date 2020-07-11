import React from "react";
import axios from "axios";

import { Button, Form } from "semantic-ui-react";

import AuthFormMixin from "./FormMixin";
import routes from "../../routes";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
      },
      errors: {
        usernameError: "",
        emailError: "",
        passwordError: "",
        passwordConfirmError: "",
      },
      request: {
        submitted: false,
        // string holding the type of response from the server to display appropriate
        // message to user on submission.
        response: null,
      },
    };
  }

  handlePostRequest = () => {
    const axiosOptions = {
      url: routes.api.accounts.viewset,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: this.state.credentials,
    };

    axios(axiosOptions)
      .then(() => this.handlePostRequestSuccess())
      .catch((error) => this.handlePostRequestFailure(error));
  };

  handlePostRequestSuccess = () => {
    let { request, credentials, errors } = { ...this.state };
    this.setSuccessMessageClasses();
    for (let key in credentials) credentials[key] = "";
    request.response = "signupSuccess";
    this.setState({ credentials, errors, request });
  };

  render() {
    const {
      username,
      email,
      password,
      passwordConfirm,
    } = this.state.credentials;
    return (
      <Form id="auth-form" onSubmit={(event) => this.handleSubmit(event)}>
        {this.injectSubmissionMessage()}
        <Form.Input
          label="Username"
          type="text"
          name="username"
          error={this.getErrorMessage("username")}
          aria-invalid="false"
          placeholder="Enter a username"
          required
          value={username}
          onChange={(event) => this.handleInputChange(event)}
        />
        <Form.Input
          label="Email Address"
          type="text"
          name="email"
          error={this.getErrorMessage("email")}
          placeholder="Enter a valid email address"
          required
          value={email}
          onChange={(event) => this.handleInputChange(event)}
        />
        <Form.Input
          label="Password"
          type="password"
          name="password"
          error={this.getErrorMessage("password")}
          placeholder="Enter your password"
          required
          value={password}
          onChange={(event) => this.handleInputChange(event)}
        />
        <Form.Input
          label="Password Confirm"
          type="password"
          name="passwordConfirm"
          error={this.getErrorMessage("passwordConfirm")}
          placeholder="Re-enter your password"
          required
          value={passwordConfirm}
          onChange={(event) => this.handleInputChange(event)}
        />
        <Button type="submit" primary>
          Sign Up
        </Button>
      </Form>
    );
  }
}

Object.assign(SignupForm.prototype, AuthFormMixin);
export default SignupForm;
