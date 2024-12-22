export const setToken = (token) => {

  return { type: "SET_TOKEN", token };
};


export const setIsSplashScreenAction = (isSplash) => {
  return { type: "SET_SplashScreen", isSplash };
};



export const setPlayIndex = (index) => {
  return { type: "SET_INDEX", index };
};