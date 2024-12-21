import * as Yup from "yup";


const BankYupSchema = Yup.object().shape({
  bankName:  Yup.string(), accountNumber: Yup.string(), accountType: Yup.string(), branch:  Yup.string(), ifscCode:  Yup.string()
});
export { BankYupSchema }