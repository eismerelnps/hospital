import { useState } from 'react';
import validator from 'validator';

const useVerifyIdentifier = () => {
  const [validation, setValidation] = useState({
    valid: true,
    message: ''
  });

  const verifyIdentifier = (identifier: string) => {
  
    if (!validator.isEmail(identifier) && identifier.trim().length < 3) {
      setValidation({
        valid: false,
        message: "Credenciales incorrectas"
      });
      return false;
    } else if (identifier.trim().length > 35) {
      setValidation({
        valid: false,
        message: "Credenciales incorrectas"
      });
      return false;
    }
    setValidation({
      valid: true,
      message: ''
    });
    return true;
  };

  return { validation, verifyIdentifier };
};

export default useVerifyIdentifier;
