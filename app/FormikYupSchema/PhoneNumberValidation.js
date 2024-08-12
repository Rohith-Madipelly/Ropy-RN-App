import * as Yup from "yup";

// const phoneRegExp = /^[6789]\d{5,}$/;

const PhoneNumberValidation = Yup.object().shape({
  
  Mobile_Number: Yup.string()
    .trim()
    // .matches(phoneRegExp, 'Phone number must start with 6, 7, 8, or 9 and have at least 6 digits')
    .test(
      'valid-start',
      'Mobile number must start with 6, 7, 8, or 9',
      (value) => {
        if (!value) return false; // Handles the case when value is null or undefined.
        return /^[6-9]/.test(value); // Checks if the first digit is 6, 7, 8, or 9.
      }
    )
    .required("Mobile number is a required field")
    .matches(/^[0-9]{10}$/, "Mobile number must be a 10-digit number"),
});

export { PhoneNumberValidation };
