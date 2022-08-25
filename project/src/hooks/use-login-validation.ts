import {useState} from 'react';

const LoginRegExp = {
  Email: new RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i),
  Password: new RegExp(/(?=.*[0-9])(?=.*[A-Za-z])[0-9A-Za-z]{2,}/),
} as const;

export const useLoginValidation = () => {
  const [isDataValid, setDataValid] = useState({
    email: true,
    password: true,
  });

  const validateEmail = (email: string) => {
    if (!email.match(LoginRegExp.Email)) {
      setDataValid((prevData) => ({
        ...prevData,
        email: false,
      }));
      return false;
    } else {
      setDataValid((prevData) => ({
        ...prevData,
        email: true,
      }));
      return true;
    }
  };

  const validatePassword = (password: string) => {
    if (!password.match(LoginRegExp.Password)) {
      setDataValid((prevData) => ({
        ...prevData,
        password: false,
      }));
      return false;
    } else {
      setDataValid((prevData) => ({
        ...prevData,
        password: true,
      }));
      return true;
    }
  };

  return {validateEmail, validatePassword, isDataValid};
};
