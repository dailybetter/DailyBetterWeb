import { configureStore } from '@reduxjs/toolkit';
import toastReducer from './toastSlice';
import authReducer from './authSlice';
import signUpReducer from './signUpSlice';
export default configureStore({
  reducer: {
    toast: toastReducer,
    auth: authReducer,
    signUp: signUpReducer,
  },
});
