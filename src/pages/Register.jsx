import React from 'react'
import { useNavigate } from 'react-router-dom'
import http from '../helpers/http';

function Register() {
  //Navigate
  const navigate = useNavigate();
  const register = async (e) => {
    try {
      e.preventDefault();
      const form = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      const encoded = new URLSearchParams(form);
      const {data} = await http().post('/auth/register', encoded.toString());
      window.localStorage.setItem('token', data.results.token);
      navigate('/');
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };

  // User Interface
  return (
    <form onSubmit={register}>
      <h3>Welcome To Register ReactJS!</h3>
      Email:<br/><input type="email" name="email" id="email" />
      <br/>
      Password:
      <br/>
      <input type="password" name="password" id="" />
      <br />
      <button>Submit</button>
    </form>
  )
}

export default Register;
