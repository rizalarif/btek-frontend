import React from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  //Navigate
  const navigate = useNavigate();
  const register = async (e) => {
    try{
      e.preventDefault();
      navigate('/login');
    }catch(err){
      window.alert(err.response.data.message);
    }
  }

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
