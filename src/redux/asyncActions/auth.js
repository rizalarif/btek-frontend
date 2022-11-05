import { createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../helpers/http';

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  const form = {
    email,
    password,
  };
  const data = new URLSearchParams(form);
  const { data: responseData } = await http().post('/auth/login', data.toString());
  return responseData;
});
