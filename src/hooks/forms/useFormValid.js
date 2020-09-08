import React from "react";

export const useFormValid = (fields, errors) => {
  const [formValid, setFormValid] = React.useState(false);

  const isFormValid = () => {
    // Form is invalid if not every field is true or not every error is false
    const fieldValues = Object.values(fields);
    const errorValues = Object.values(errors);
    if (!fieldValues.every((value) => value)) return false;
    if (!errorValues.every((value) => !value)) return false;
    return true;
  };
  React.useEffect(() => {
    setFormValid(isFormValid());
  }, [JSON.stringify(errors)]);

  return [formValid, setFormValid];
};
