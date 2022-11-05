import { combineReducers } from "@reduxjs/toolkit";

import profile from './profile'

import auth from "./auth";

const reducer = combineReducers({
  profile,auth,
})

export default reducer
