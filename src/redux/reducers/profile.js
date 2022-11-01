import { createSlice } from '@reduxjs/toolkit'

import * as profileAction from '../asyncActions/profile'

const initialState = {
  user: {}
}

const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfile: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(profileAction.getDataUser.fulfilled, (state, action)=>{
      state.user = action.payload.result
    })
    builder.addCase(profileAction.editData.fulfilled,(state, action)=>{
      state.user = action.payload.result
    })
  }
});

export const {resetProfile} = profile.actions

export default profile.reducer
