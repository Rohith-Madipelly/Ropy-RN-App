import * as Yup from "yup";


const InterestsFormYupSchema = Yup.object().shape({
  InterestsData: Yup.string(),
});
export { InterestsFormYupSchema }