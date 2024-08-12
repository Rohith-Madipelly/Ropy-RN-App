import * as Yup from "yup";


const ProfileYupSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is a required"),
  lastName: Yup.string().required("Last name is a required"),

  email: Yup.string().email("Email must be a valid email").test(
    "is-valid",
    "Email must be a valid email",
    (value) =>
      Yup.string()
        .email()
        .matches(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,})$/)
        .isValidSync(value) || /^\d{10}$/.test(value)
  ).required("Email is a Required Field "),

  dateOfBirth: Yup.string(),
  userAge: Yup.string()
    // .matches(/^[0-9]$/, "Mobile number must be a 10-digit number")
,
  // gender:Yup.string(),
  occupation: Yup.string(),


  gender: Yup.string()
    .required("Gender is a required field")
    .oneOf(["Male", "Female", "Other"], "Invalid Gender"),

});
export { ProfileYupSchema }