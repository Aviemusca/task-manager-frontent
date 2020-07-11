import React from "react";
import { Message } from "semantic-ui-react";

// eslint-disable-next-line
const RegExJS = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// A mixin for the login and signup authentication forms
const AuthFormMixin = {
  handleInputChange(event) {
    const { name, value } = event.target;
    const { credentials, errors, request } = { ...this.state };
    credentials[name] = value;
    if (request.submitted) {
      // When user previously submitted and restarts filling form
      request.submitted = false;
      this.resetFormClasses();
    }
    this.setState({ credentials, errors, request });
    this.validateInputChange(name, value);
  },

  validateInputChange(name, value) {
    switch (name) {
      case "username":
        this.validateUsername(value);
        break;
      case "email":
        this.validateEmail(value);
        break;
      case "password":
        this.validatePassword(value);
        break;
      case "passwordConfirm":
        this.validatePasswordConfirm(value);
        break;
      default:
        throw new Error(`Input ${name} not recognized.`);
    }
  },

  validateUsername() {
    const { credentials, errors } = { ...this.state };
    credentials.username.length < 3
      ? (errors["usernameError"] =
          "Username must be at least 3 characters long!")
      : (errors["usernameError"] = "");
    this.setState({ credentials, errors });
  },

  validateEmail() {
    const { credentials, errors } = { ...this.state };
    const emailRegex = RegExp(RegExJS);
    !emailRegex.test(credentials.email)
      ? (errors["emailError"] = "Invalid email address!")
      : (errors["emailError"] = "");
    this.setState({ credentials, errors });
  },

  validatePassword() {
    const { credentials, errors } = { ...this.state };
    credentials.password.length < 8
      ? (errors["passwordError"] =
          "Password must be at least 8 characters long!")
      : (errors["passwordError"] = "");
    this.setState({ credentials, errors });
  },

  validatePasswordConfirm() {
    const { credentials, errors } = { ...this.state };
    credentials.passwordConfirm !== credentials.password
      ? (errors["passwordConfirmError"] = "Passwords do not match!")
      : (errors["passwordConfirmError"] = "");
    this.setState({ credentials, errors });
  },

  formIsValid() {
    // Form is invalid if not every credential is true or not every error is false
    const credentialValues = Object.values(this.state.credentials);
    const errorValues = Object.values(this.state.errors);
    if (!credentialValues.every((value) => value)) return false;
    if (!errorValues.every((value) => !value)) return false;
    return true;
  },

  getErrorMessage(inputName) {
    // Render an error message if an input value is true and invalid
    const { credentials, errors } = { ...this.state };
    const inputNameError = inputName + "Error";
    const errorMessage = errors[inputNameError];
    if (!credentials[inputName]) return false;
    if (errorMessage) return { content: errorMessage };
  },

  handleSubmit(event) {
    event.preventDefault();
    const newState = { ...this.state };
    newState.request.submitted = true;
    this.setState({ ...newState });
    this.formIsValid()
      ? this.handlePostRequest()
      : this.handleInvalidFormSubmission();
  },
  handlePostRequestFailure(error) {
    const statusCode = error.response.status;
    switch (statusCode) {
      case 400:
        this.handle400Error(error.response.data);
        break;
      default:
        throw new Error(`Status code ${statusCode} not recognized.`);
    }
    console.log(JSON.stringify(error.response));
  },

  handle400Error(data) {
    const { request, credentials, errors } = { ...this.state };
    const errorField = Object.keys(data)[0];
    switch (errorField) {
      case "username":
        request.response = "userExistsError";
        break;
      case "non_field_errors":
        request.response = "invalidCredentialsError";
        break;

      default:
        throw new Error(`Culprit error field ${errorField} not recognized.`);
    }
    this.setFailureMessageClasses();
    this.setState({ credentials, errors, request });
  },

  handleInvalidFormSubmission() {
    const { request, credentials, errors } = { ...this.state };
    request.response = "invalidFormSubmission";
    this.setFailureMessageClasses();
    this.setState({ credentials, errors, request });
  },

  setSuccessMessageClasses() {
    // To display form msgs with S UI, form requires class
    // Message component alone not sufficient
    const form = document.getElementById("auth-form");
    form.classList = "ui form success";
  },

  setFailureMessageClasses() {
    const form = document.getElementById("auth-form");
    form.classList = "ui form error";
  },

  resetFormClasses() {
    const form = document.getElementById("auth-form");
    form.classList = "ui form";
  },

  injectSubmissionMessage() {
    // Need to refactor
    const { submitted, response } = this.state.request;
    if (submitted) {
      switch (response) {
        case null:
          break;
        case "signupSuccess":
          return (
            <Message
              success
              header="Account Created!"
              content="You can now sign in"
            />
          );
        case "loginSuccess":
          return (
            <Message
              success
              header="Success!"
              content="You are now signed in"
            />
          );
        case "userExistsError":
          return (
            <Message
              error
              header="Username already exists!"
              content="Please try another username"
            />
          );
        case "invalidCredentialsError":
          return (
            <Message
              error
              header="Invalid User Credentials!"
              content="The provided username or password is invalid"
            />
          );
        case "invalidFormSubmission":
          return (
            <Message
              error
              header="Invalid Form Submission!"
              content="Please fill out all the required fields correctly"
            />
          );

        default:
          throw new Error(`Response type ${response} not recognized.`);
      }
    }
  },
};

export default AuthFormMixin;
