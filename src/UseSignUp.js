// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";

const useSignUp =(setIsValid) => {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    cardNumber: "",
    expirationDate: "",
    pin: ""
  });

  const [inputsValidity, setInputsValidity] = useState({
    fullNameIsValid: false,
    emailIsValid: false,
    phoneNumberIsValid: false,
    passwordIsValid: false,
    confirmPasswordIsValid: false,
    cardNumberIsValid: false,
    expirationDateIsValid: false,
    pinIsValid: false
  });

  //Update form validity
  useEffect(() => {
    let validityCheck = Object.values(inputsValidity).every(
      inputValidity => inputValidity === true
    );
    setIsValid(validityCheck);
  }, [inputsValidity,setIsValid]);

  const handleInputValidation = (id, value) => {
    //StateId variable holds the property name of the id (element) in inputsValidity state
    let stateId = `${id}IsValid`,
      isValid = false;
    // Query selector for visual cues on invalid element
    
    //Regex to validate form elements
    switch (id) {
      case "fullName":
        isValid = /^[a-z]{2,}\s[a-z]{2,}/i.test(value);
        break;
      case "email":
        isValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
          value
        );
        break;
      case "phoneNumber":
        isValid = /^(070|080|090|081)[0-9]{8}$/.test(value);
        break;
      case "password":
        isValid = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/.test(
          value
        );
        break;
      case "confirmPassword":
        let passwordRegex = new RegExp(`^${inputs.password}$`);
        isValid = passwordRegex.test(value);
        break;
      case "cardNumber":
        isValid = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(value);
        break;
      case "expirationDate":
        //Also validates MM is within 01-12 and year >= 20
        isValid = /^(0[1-9])|(1[0-2])\/([2-9]\d)$/.test(value);
        break;
      case "pin":
        isValid = /^[0-9]{4}$/.test(value);
        break;
      default:
        break;
    }

    setInputsValidity(inputsValidity => ({
      ...inputsValidity,
      [stateId]: isValid
    }));

    if (isValid) {
      document.getElementById(id).classList.remove('border-danger')
    }
    else {
      document.getElementById(id).classList.add('border-danger')
    }
  };

  const handleInputChange = event => {
    event.persist();
    const {
      target: { id, value }
    } = event;
    let updateValue, tempValue;
    let numRegex = !/[-!$%^&*()_+|~=`{}@#[\]:";'<>?,.a-z]/i.test(value);

    switch (id) {
      //Restrict input to numeric values for appropriate fields
      case "phoneNumber":
      case "pin":
        updateValue = numRegex ? value : inputs[id];
        break;
      case "cardNumber":
        tempValue = numRegex ? value : inputs[id];
        //Format CardNumber as XXXX XXXX XXXX XXXX
        updateValue = tempValue.replace(
          /(\d{4})\s*(\d{0,4})\s*(\d{0,4})\s*(\d{0,4})/,
          (match, p1, p2, p3, p4, string) =>
            [p1, p2, p3, p4].join(" ").replace(/(\s+$)/, "")
        );
        break;

      case "expirationDate":
        tempValue = numRegex ? value : inputs[id];
        //Format as MM/YY
        updateValue = tempValue.replace(
          /(\d{2})\/*(\d{0,2})/,
          (match, p1, p2, string) => [p1, p2].join("/").replace(/(\/+$)/, "")
        );
        break;

      default:
        updateValue = value;
        break;
    }

    setInputs(inputs => ({ ...inputs, [id]: updateValue }));
    handleInputValidation(id, updateValue);
  };

  return {
    inputs,
    inputsValidity,
    handleInputChange
  };
};

export default useSignUp;
