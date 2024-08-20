import * as Yup from "yup";


const ProfilePicYupSchema = Yup.object().shape({
  // firstName: Yup.string().required("First name is a required"),

  profile_pic: Yup.mixed().required('File is required')
  .test(
    'fileType',
    'Unsupported file format Upload Only pdf format less than 10mb',

    // value => value && ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type)
    value => value && value.mimeType === 'image/jpeg'
  
  )
  .test(
    'fileSize',
    'File too large',
    value => value && value.size <= 1024 * 1024 * 2 // 10MB limit
  )
,




});
export { ProfilePicYupSchema }