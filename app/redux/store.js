
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import loginReducer from "./reducers/loginReducer";
import ProfileDataReducer from './reducers/ProfileDataReducer';

// Combine reducers
const rootReducer = combineReducers({
  login: loginReducer,
  ProfileData:ProfileDataReducer
});


// Configure the store

export const store = configureStore({
  reducer: rootReducer,
});
