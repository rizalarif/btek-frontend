import { createSlice } from '@reduxjs/toolkit';
import * as authAction from '../asyncActions/auth';

const initialState = {
  user: {},
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleReset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(authAction.login.fulfilled, (state, action) => {
      state.user = action.payload.results;
    });
  },
});

export const { handleReset } = auth.actions;

export default auth.reducer;
