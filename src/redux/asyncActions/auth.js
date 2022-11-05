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

export const register = createAsyncThunk('auth/register', async ({ email, password }) => {
  const form = {
    email,
    password,
  };
  const data = new URLSearchParams(form);
  const { data: responseData } = await http().post('/auth/register', data.toString());
  return responseData;
});

export const forgotPassword = createAsyncThunk('auth/forgot-password', async ({ email }) => {
  const form = {
    email,
  };
  const data = new URLSearchParams(form);
  const { data: responseData } = await http().post('/auth/forgot-password', data.toString());
  return responseData;
});

export const resetPassword = createAsyncThunk('auth/reset-password', async ({
  email,
  code,
  newPassword,
  confirmPassword,
}) => {
  const form = {
    email,
    code,
    newPassword,
    confirmPassword,
  };
  const data = new URLSearchParams(form);
  const { data: responseData } = await http().post('/auth/reset-password', data.toString());
  return responseData;
});
