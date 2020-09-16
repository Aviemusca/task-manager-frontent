import React from "react";
import { NavLink } from "react-router-dom";

import LoginForm from "./LoginForm";
import { AuthFormContainer, AuthFormTitle, AuthFormFooter } from "./authStyles";

import routes from "../../routes";

export default function LoginView({ userCredentials, setUserCredentials }) {
  return (
    <AuthFormContainer>
      <AuthFormTitle>Sign In</AuthFormTitle>
      <LoginForm
        userCredentials={userCredentials}
        setUserCredentials={setUserCredentials}
      />
      <AuthFormFooter>
        <div>
          <small>
            Need an account?
            <NavLink to={routes.pages.signup}> Sign Up</NavLink>
          </small>
        </div>
      </AuthFormFooter>
    </AuthFormContainer>
  );
}
