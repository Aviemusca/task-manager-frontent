import React from "react";

// eslint-disable-next-line
const RegExJS = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateEmailInput = (email) => {
  const emailRegex = RegExp(RegExJS);
  return !emailRegex.test(email) ? "Invalid email address!" : "";
};

const validateTextInput = (text) => {
  return text.length < 3 ? `Entry must be at least 3 characters long!` : "";
};

export const useFormFields = (initialState) => {
  const [fields, setFields] = React.useState(initialState);

  return [
    fields,
    function (event) {
      setFields({ ...fields, [event.target.name]: event.target.value });
    },
  ];
};

export const useFormField = (initialState, validationMethod) => {
  const [field, setField] = React.useState(initialState);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    !field ? setError("") : setError(validationMethod(field));
  }, [field]);

  return [
    field,
    setField,
    error,
    setError,
    function (event) {
      setField(event.target.value);
    },
  ];
};

export const useEmailFormField = (initialState) => {
  const [email, setEmail, error, setError, handleChange] = useFormField(
    initialState,
    validateEmailInput
  );

  return [email, setEmail, error, setError, handleChange];
};

export const useTextFormField = (initialState) => {
  const [text, setText, error, setError, handleChange] = useFormField(
    initialState,
    validateTextInput
  );

  return [text, setText, error, setError, handleChange];
};