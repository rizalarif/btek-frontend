import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import * as authAction from '../redux/reducers/auth'

import Button from '../components/Button';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    window.localStorage.removeItem("token")
    dispatch(authAction.handleReset());
    navigate("/login")
  }

  return (
    <div>Home &middot;
      <Link to="/profile">Profile</Link>
      <br />
      <button type="button" onClick={logout}>Logout</button>
      <Button>OK</Button>
    </div>
  )
}

export default Home
