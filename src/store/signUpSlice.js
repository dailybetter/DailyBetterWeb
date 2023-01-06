import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  isModalOpend: false,
};

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    openSignUp: (state) => {
      state.isModalOpend = !state.isModalOpend;
    },
  },
});
export const { openSignUp } = signUpSlice.actions;

export default signUpSlice.reducer;
