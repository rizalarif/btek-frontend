/* eslint-disable no-alert */
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const navigate = useNavigate();
  const resetAction = async (e) => {
    try {
      e.preventDefault();
      navigate('/login');
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };

  return (
    <form onSubmit={resetAction}>
      Code :
      <br />
      <input type="number" name="code" />
      <br />
      Email :
      <br />
      <input type="email" name="email" />
      <br />
      New Password :
      <br />
      <input type="password" name="newPassword" />
      <br />
      Confirm Password :
      <br />
      <input type="password" name="confirmPassword" />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ResetPassword;
