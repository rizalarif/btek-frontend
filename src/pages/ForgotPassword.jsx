import React from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../helpers/http';

function ForgotPassword() {
  const navigate = useNavigate();
  const forgotAction = async (e) => {
    try {
      e.preventDefault();
      const email = e.target.email.value;
      await http().post('/auth/forgot-password', email);
      navigate('/reset-password');
    } catch (err) {
      // eslint-disable-next-line no-alert
      window.alert(err.response.data.message);
    }
  };
  return (
    <form onSubmit={forgotAction}>
      Input email address, to send the confirmation code
      <br />
      <input type="email" name="email" />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ForgotPassword;
