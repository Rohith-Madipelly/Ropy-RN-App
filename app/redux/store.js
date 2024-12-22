
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import loginReducer from "./reducers/loginReducer";
import ProfileDataReducer from './reducers/ProfileDataReducer';
import PlayerIndex from './reducers/PlayerIndex';

// Combine reducers
const rootReducer = combineReducers({
  login: loginReducer,
  ProfileData:ProfileDataReducer,
  PlayerIndex:PlayerIndex
});


// Configure the store

export const store = configureStore({
  reducer: rootReducer,
});
