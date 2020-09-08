import React from "react";

// eslint-disable-next-line
const RegExJS = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateEmailInput = (email) => {
  const emailRegex = RegExp(RegExJS);
  return !emailRegex.test(email) ? "Invalid email address!" : "";
};

const validateTextInput = (text, minChars) => {
  return text.length < minChars
    ? `Entry must be at least ${minChars} characters long!`
    : "";
};

export const useFormFields = (initialState) => {
  const [fields, setFields] = React.useState(initialState);

  return [
    fields,
    setFields,
    function (event) {
      setFields({ ...fields, [event.target.name]: event.target.value });
    },
  ];
};

export const useFormFieldsWithErrors = (
  initialFields,
  initialErrors,
  formSubmitted,
  setFormSubmitted
) => {
  // sets field errors after validation on input changes
  const [fields, setFields] = React.useState(initialFields);
  const [errors, setErrors] = React.useState(initialErrors);

  const validate = (value, errorProps) => {
    const { errorName, errorType } = errorProps;
    let error = "";
    if (!value) return setErrors({ ...errors, [errorName]: error });
    switch (errorType) {
      case "textError":
        error = validateTextInput(value, errorProps.minChars);
        break;
      case "emailError":
        error = validateEmailInput(value);
        break;
      default:
        throw new Error(`Error type ${errorType} not recognized.`);
    }
    setErrors({ ...errors, [errorName]: error });
  };

  const handleChange = (event, error) => {
    if (formSubmitted) setFormSubmitted(false);
    validate(event.target.value, error);
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  return [fields, setFields, errors, setErrors, handleChange];
};

export const useFormErrorFields = (initialErrors) => {
  const [errors, setErrors] = React.useState(initialErrors);

  return [
    errors,
    setErrors,
    function (event) {
      console.log([event.target.name]);
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
