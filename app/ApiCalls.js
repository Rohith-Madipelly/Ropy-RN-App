import axios from 'axios';


import { GUEST_URL } from '../Enviornment.js'


//Bank API res IFSC Code req Bank Details 
export const Bank_Details_on_IFSC = async (IFSC_CODE) => {
  return await axios.get(`https://ifsc.razorpay.com/${IFSC_CODE}`);
  // return await axios.get(`https://ifsc.razorpay.com/SBIN0021108`);
};


// Login API  ff
export const UserLoginApi = async (loginFormReq) => {
  return await axios.post(`${GUEST_URL}/login`, loginFormReq)
}


// Register API  ff
export const UserRegisterApi = async (loginFormReq) => {
  return await axios.post(`${GUEST_URL}/register`, loginFormReq)
}

//  API  ff
export const UserProfileSetUpApi = async (loginFormReq, TokenForSetUp) => {
  return await axios.post(`${GUEST_URL}/user/profile`, loginFormReq, {
    headers: {
      'Authorization': `Bearer ${TokenForSetUp}`
    }
  })
}


//  API  ff
export const GetAllInterests_API = async (TokenForSetUp) => {
  return await axios.get(`${GUEST_URL}/user/interests`, {
    headers: {
      'Authorization': `Bearer ${TokenForSetUp}`
    }
  })
}


//ADD INTERESTS  ff
export const ADDINTERESTS_API = async (interestsIds, TokenForSetUp) => {
  return await axios.post(`${GUEST_URL}/user/interests`, { interestsIds }, {
    headers: {
      'Authorization': `Bearer ${TokenForSetUp}`
    }
  })
}
// Register API
export const UserRegisterOTPApi = async (registerFormReq) => {
  const ReqData = {
    email: registerFormReq.email
  }
  return await axios.post(`${GUEST_URL}/sendotp`, ReqData)
}



// Verify OTP API
export const verifyOTPAPI = async (email, values) => {
  const ReqData = {
    email: email,
    userotp: values,
  }

  console.log(ReqData)
  return await axios.post(`${GUEST_URL}/verifyotp`, ReqData)

}

// CREATE PASSWORD
export const createPasswordAPI = async (values, token) => {
  console.log(token, ">>", values)

  const appReqData = {
    password: "Rohith@123"
  }
  return await axios.post(`${GUEST_URL}/user/createpassword`, appReqData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}
















// Main Screen API's


//Home
export const HomeAPI = async (ReqData, page, token) => {
  return await axios.get(`${GUEST_URL}/user/home`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }

    });
};


//Video api  locations based
export const GetVideoByLocationAPI = async (latitude, longitude, page, videosCount, token) => {


  console.log("sdjgbsd", latitude, longitude, page, videosCount, token)

  return await axios.get(`${GUEST_URL}/user/home`, {
    params: {
      latitude: latitude,
      longitude: longitude,
      page: page,
      videosCount: videosCount,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};




// Put Like on Video
export const PutLikeAPI = async (dateVideoId, token) => {

  return await axios.get(`${GUEST_URL}/user/video/${dateVideoId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }

  });
};


//Profile rewarded
export const VIDEO_REWARD_API = async (videoId, tokenn) => {
console.log("videoId",videoId)

  return await axios.get(`${GUEST_URL}/user/wallet/${videoId}`, {
    headers: {
      'Authorization': `Bearer ${tokenn}`
    }
  });
};


// Repost API Call
export const REPORT_VIDEO_API = async (ReqData, token) => {

  return await axios.post(`${GUEST_URL}/user/report`,
    ReqData,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }

    });
};




// Hello

// Get Wallet Amount
export const GetWalletAmountAPI = async (token) => {
  return await axios.get(`${GUEST_URL}/user/walletamount`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }

  });
};


//Profile api 
export const UserGetProfileDetails = async (token) => {
  return await axios.get(`${GUEST_URL}/user/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};



// Change Password
export const CHANGE_PASSWORD_API = async (reqData, token) => {
  return await axios.put(`${GUEST_URL}/user/password`, reqData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}


//Saved Location 
export const GET_SAVED_LOCATION = async (token) => {
  return await axios.get(`${GUEST_URL}/user/location`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};



//Saved Location 
export const ADD_SAVED_LOCATION = async (id, token) => {
  return await axios.get(`${GUEST_URL}/user/location/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};



//GET SEttingsAPI
export const GET_SETTINGS_API = async (id, token) => {
  return await axios.get(`${GUEST_URL}/user/location/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};


//Upload Profile Pic api 
export const UPDATE_PROFILE_PIC_API = async (image, token) => {
  const formData = new FormData();

  formData.append('profilePicture', {
    uri: image.uri,
    name: image.name || "NO fileName",
    type: image.mimeType || 'application/octet-stream'
  })


  return await axios.put(`${GUEST_URL}/user/profile`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};


export const UserProfilePicUploadAPI2 = async (data, token) => {
  const formData = new FormData();

  formData.append("firstName", data.firstName);
  formData.append("lastName", data.lastName);
  formData.append("dob", data.dob);
  formData.append("age", data.age);
  formData.append("gender", data.gender);
  formData.append("occupation", data.occupation);

  console.log('FormData:', formData);


  return await axios.put(`${GUEST_URL}/user/profile`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const UPDATE_PROFILE_API = async (user, token) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(user)) {
    if (key === 'passPortPicture') {

    } else {
      formData.append(key, value);
    }
  }
  return await axios.put(`${GUEST_URL}/user/profile`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
}









// Account Verfification API 



// 1 ADD PERSONAL DETAILS 
export const AddPersonalDetailsAPI = async (data, token) => {
  const formData = new FormData();



  formData.append("address", data.address);
  formData.append("area", data.area);
  formData.append("dateOfBirth", data.dateOfBirth);
  formData.append("district", data.district);
  formData.append("firstName", data.firstName);
  formData.append("lastName", data.lastName);
  formData.append("phoneNumber", data.phoneNumber);
  formData.append("pinCode", data.pinCode);
  formData.append("street", data.street);


  // const file = new File(
  //   [/* binary data here */],
  //   data.passPortPicture.name,
  //   { type: data.passPortPicture.mimeType }
  // );




  // formData.append("passPortPicture", file);



  // for (const [key, value] of Object.entries(data)) {
  //   if (key === 'passPortPicture') {
  //     // Assuming value contains binary data, name, and mimeType
  //     const file = new File(
  //       [value.binaryData],
  //       value.name,
  //       { type: value.mimeType }
  //     );
  //     console.log("passPortPicture", file);
  //     formData.append(key, file);
  //   } else {
  //     formData.append(key, value);
  //   }
  // }


  // console.log("sc",formData._parts[0].[passPortPicture])

  // Simple Process
  formData.append('passPortPicture', {
    uri: data.passPortPicture.uri,
    name: data.passPortPicture.name,
    type: data.passPortPicture.mimeType || 'application/octet-stream'
  });


  return await axios.post(`${GUEST_URL}/user/addpersonaldetails`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 2 send otp 
export const SendAadharOtpAPI = async (APIData, token) => {
  return await axios.post(`${GUEST_URL}/user/sendaadharotp`, APIData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}


// 2.2 verify otp VERIFY AADHAAR OTP
export const VerifyAadhaarOtpAPI = async (APIData, token) => {
  return await axios.post(`${GUEST_URL}/user/verifyaadharotp`, APIData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

// 3 PAN VERIFICATION
export const PanVerificationAPI = async (APIData, token) => {
  console.log(APIData)
  return await axios.post(`${GUEST_URL}/user/verifypan`, APIData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}


// 4 ELECTRICITY BILL VERIFICATION
export const ElectricityBillVerificationAPI = async (APIData, token) => {
  console.log(APIData)
  return await axios.post(`${GUEST_URL}/user/verifyelectricity`, APIData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

// 5 ADD EMPLOYMENT TYPE 
export const AddEmploymentTypeAPI = async (APIData, token) => {
  // console.log(APIData)employmentType
  const DataAPI = {
    employmentType: "Salaried"
  }
  return await axios.post(`${GUEST_URL}/user/addemployment`, DataAPI, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}



// 6 ADDEXECUTIVEAPI
export const ADDEXECUTIVEAPI = async (data, token) => {
  return await axios.post(`${GUEST_URL}/user/executive`, data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}



// 7 ADD SALARY SLIP
export const AddSalarySlipAPI = async (result, token) => {
  const formData = new FormData();


  formData.append('salarySlip', {
    uri: result.uri,
    name: result.name,
    type: result.mimeType || 'application/octet-stream'
  })

  return await axios.post(`${GUEST_URL}/user/salaryslip`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
}



// 8 BANK VERIFICATION
export const BankVerificationAPI = async (data, token) => {
  return await axios.post(`${GUEST_URL}/user/verifybank`, data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}




// SHOW AGREEMENT
export const showAgreementAPI = async (token) => {
  return await axios.get(`${GUEST_URL}/user/showagreement`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

// AGREEMENT ACCEPT
export const agreementAcceptAPI = async (token) => {
  return await axios.get(`${GUEST_URL}/user/agreement`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}




