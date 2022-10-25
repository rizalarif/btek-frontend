import React from "react";
import {useLocation, Navigate} from 'react-router-dom'


function RequireAuth ({children}) {
  const location = useLocation();
  const token = window.localStorage.getItem('token');
  if(!token){
    return <Navigate to="/login" state={{from: location}} />
  }
  return children;
}

export default RequireAuth;
