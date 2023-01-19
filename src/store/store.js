import { configureStore } from '@reduxjs/toolkit';
import toastReducer from './toastSlice';
import authReducer from './authSlice';
import signUpReducer from './signUpSlice';
import postitReducer from './postitSlice';

export default configureStore({
  reducer: {
    toast: toastReducer,
    auth: authReducer,
    signUp: signUpReducer,
    postit: postitReducer,
  },
});
