import React, { useState } from 'react';

type ValidatorFn = (value: string) => boolean;

export const useInput = (validateFunction: ValidatorFn) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [IsTouched, setIsTouched] = useState(false);

  // Validation
  const valueIsValid = validateFunction(enteredValue);
  const hasError = !valueIsValid && IsTouched;

  // onChange
  const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(e.target.value);
  };

  // onBlur
  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  // onRest
  const resetHandler = () => {
    setEnteredValue('');
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    resetHandler,
  };
};
