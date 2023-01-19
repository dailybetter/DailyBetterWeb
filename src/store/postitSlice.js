import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUpdate: false,
};

const postitSlice = createSlice({
  name: 'postit',
  initialState,
  reducers: {
    postitUpdate: (state) => {
      state.isUpdate = !state.isUpdate;
    },
  },
});
export const { postitUpdate } = postitSlice.actions;
export default postitSlice.reducer;
