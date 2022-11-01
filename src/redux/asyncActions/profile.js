import { createAsyncThunk } from "@reduxjs/toolkit";
import http from '../../helpers/http';

export const getDataUser = createAsyncThunk('profile/getDataUser', async ({token})=>{
  const {data} = await http(token).get('/profile')
  return data
})

export const editData = createAsyncThunk('profile/editData', async ({ token, data }) => {
  const form = new FormData();
  form.append('fullName', data.fullName);
  form.append('birthDate', data.birthDate);
  form.append('picture', data.picture);
  const { data: responseData } = await http(token).put('/profile', form, {
    headers: {
      'Content-Type': 'multypart/form-data',
    },
  });
  return responseData;
});
