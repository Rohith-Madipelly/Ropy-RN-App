
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import loginReducer from "./reducers/loginReducer";

// Combine reducers
const rootReducer = combineReducers({
  login: loginReducer,
});


// Configure the store

export const store = configureStore({
  reducer: rootReducer,
});
