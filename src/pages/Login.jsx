import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import http from '../helpers/http';

function Login() {
  const navigate = useNavigate()
  const submitAction = async (e) => {
    try{
      e.preventDefault();
      const form = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      const encoded = new URLSearchParams(form);
      const {data} = await http().post('/auth/login', encoded.toString());
      window.localStorage.setItem("token", data.results.token);
      navigate('/');
    }catch(err){
      window.alert(err.response.data.message);
    }
  }

  return (
    <>
    <form onSubmit={submitAction}>
      <input type="email" name="email" />
      <br />
      <input type="password" name="password" />
      <br />
      <button type="submit">Login</button>
    </form>
    <div>
        <Link to="/forgot-password">Forgot Password</Link>
    </div>
    <div>
      <button type="submit" className='btnregister'>
        <Link to="/register">SignUp!</Link>
      </button>
    </div>

    </>

  );
}

export default Login
