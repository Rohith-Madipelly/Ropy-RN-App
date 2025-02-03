import * as Yup from "yup";

const ProfileYupSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(
      /^[A-Za-z]+$/,
      "First name should only contain alphabets without spaces or special characters"
    )
    .min(3, "First name must be at least 3 characters long")
    .max(30, "First name must not exceed 30 characters")
    .required("First name is required"),

  lastName: Yup.string()
    .matches(
      /^[A-Za-z]+$/,
      "Last name should only contain alphabets without spaces or special characters"
    )
    .min(1, "Last name must be at least 1 character long")
    .max(20, "Last name must not exceed 20 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Email must be a valid email")
    .test(
      "is-valid",
      "Email must be a valid email",
      (value) =>
        Yup.string()
          .email()
          .matches(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,})$/)
          .isValidSync(value) || /^\d{10}$/.test(value)
    )
    .required("Email is a Required Field "),
  dob: Yup.string().required("Date of birth is a Required Field "),
  age: Yup.string()
    .min(14, "Age must be greater than 13")
    .required("Age is a Required Field "),
  // .matches(/^[0-9]$/, "Mobile number must be a 10-digit number")
  // gender:Yup.string(),
  occupation: Yup.string().required("Ocuupation is a Required Feild"),

  otherOccupation: Yup.string().when(["occupation"], ([occupation], schema) => {
    if (occupation == "Other (custom entry)")
      return schema.required("Other occupation is required");
    return;
  }),

  gender: Yup.string()
    .required("Gender is a required field")
    .oneOf(["Male", "Female", "Other"], "Invalid Gender"),
});
export { ProfileYupSchema };
