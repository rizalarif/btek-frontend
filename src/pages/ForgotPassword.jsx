import React from 'react'
import { useNavigate } from 'react-router-dom'
import http from '../helpers/http';

function ForgotPassword(){

  return (
    <form onSubmit={sendCode}>
      <h5 className='h5forgot'>
        Enter your email and we'll send you a secret code to your account email.
      </h5>
      <div>
        Email : <br /><input type="email" name="email"/>
        <br />
        <button className='btn-on-forgot' type="submit">send!</button>
      </div>
    </form>
  )

}

export default ForgotPassword
