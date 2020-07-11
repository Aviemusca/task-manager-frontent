import React from "react";
import axios from "axios";

import { Button, Form } from "semantic-ui-react";

import AuthFormMixin from "./FormMixin";

import routes from "../../routes";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        username: "",
        password: "",
      },
      errors: {
        usernameError: "",
        passwordError: "",
      },
      request: {
        submitted: false,
        response: null,
      },
    };
  }
  handleInputChange = (event) => {
    const { name, value } = event.target;
    const { credentials, errors, request } = { ...this.state };
    credentials[name] = value;
    if (request.submitted) {
      // When user previously submitted and restarts filling form
      request.submitted = false;
      this.resetFormClasses();
    }
    this.setState({ credentials, errors, request });
  };

  handlePostRequest = () => {
    const axiosOptions = {
      url: routes.api.accounts.authToken,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: this.state.credentials,
    };
    axios(axiosOptions)
      .then((response) => this.handlePostRequestSuccess(response))
      .catch((error) => this.handlePostRequestFailure(error));
  };

  handlePostRequestSuccess = (response) => {
    let { request, credentials, errors } = { ...this.state };
    const newCredentials = {
      username: credentials.username,
      token: response.data.token,
    };
    this.props.setUserCredentials(newCredentials);

    localStorage.setItem(
      "taskManagerAuthenticationUsername",
      credentials.username
    );
    this.setSuccessMessageClasses();
    for (let key in credentials) credentials[key] = "";
    request.response = "loginSuccess";
    localStorage.setItem("taskManagerAuthenticationToken", response.data.token);

    this.setState({ credentials, errors, request });
  };

  render() {
    const { username, password } = { ...this.state.credentials };
    return (
      <Form id="auth-form" onSubmit={(event) => this.handleSubmit(event)}>
        {this.injectSubmissionMessage()}
        <Form.Input
          label="Username"
          type="text"
          name="username"
          error={this.getErrorMessage("username")}
          placeholder="Enter a username"
          required
          value={username}
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
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
    );
  }
}

Object.assign(LoginForm.prototype, AuthFormMixin);
export default LoginForm;
