import React from "react";
import { NavLink } from "react-router-dom";

import SignupForm from "./SignUpForm";
import { AuthFormContainer, AuthFormTitle, AuthFormFooter } from "./styles";

import routes from "../../routes";

export default function SignupView() {
  return (
    <AuthFormContainer>
      <AuthFormTitle>Join Today</AuthFormTitle>
      <SignupForm />
      <AuthFormFooter>
        <small>
          Already have an account?
          <NavLink to={routes.pages.login}> Sign in</NavLink>
        </small>
      </AuthFormFooter>
    </AuthFormContainer>
  );
}
