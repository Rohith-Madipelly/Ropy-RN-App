import * as Yup from "yup";


const LoginYupSchema = Yup.object().shape({
  // email: Yup.string().email("Email must be a valid email").test(
  //   "is-valid",
  //   "Email must be a valid email",
  //   (value) =>
  //     Yup.string()
  //       .email()
  //       .matches(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,})$/)
  //       .isValidSync(value) || /^\d{10}$/.test(value)
  // ).required("Email is a Required Field "),


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



  password: Yup.string()
  .min(8, "Password length is short")
  .max(225, "Password length is too Long")
  .required("Password is a required field")

  .test(
    "password-requirements",
    "Password must meet the following criteria:\n- At least 1 uppercase letter\n- At least 1 lowercase letter\n- At least 1 digit\n- At least 1 special character",
    (value) => {
      // Password validation logic here (using a regular expression or other methods)
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/.test(value);
    }
  )
});
export { LoginYupSchema }