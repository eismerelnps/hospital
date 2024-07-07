import { useState } from 'react';
import validator from 'validator';

const useVerifyPassword = () => {
  const [passwordValidation, setPasswordValidation] = useState({
    valid: true,
    message: ''
  });

  const verifyPassword = (password: string) => {
    const trimmedPassword = password.trim();

    if (!validator.isLength(trimmedPassword, { min: 4, max: 128 })) {
      setPasswordValidation({
        valid: false,
        message: "Contraseña muy corta"
      });
      return false;
    }

    // if (!/[a-z]/.test(trimmedPassword) || !/[A-Z]/.test(trimmedPassword) || !/\d/.test(trimmedPassword)) {
    //   setPasswordValidation({
    //     valid: false,
    //     message: t('weak_password')
    //   });
    //   return false;
    // }

    setPasswordValidation({
      valid: true,
      message: ''
    });
    return true;
  };

  return { passwordValidation, verifyPassword };
};

export default useVerifyPassword;
