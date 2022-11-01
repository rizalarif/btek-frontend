import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import * as profileAction from '../redux/asyncActions/profile'

import { Link } from 'react-router-dom'

import * as profileReducerAction from '../redux/reducers/profile'

function Profile() {
  const dispatch = useDispatch()
  const userProfile = useSelector(state => state.profile.user)
  // const [userProfile, setUserProfile] = React.useState({})
  // const getProfile = async () => {
  //   const token = window.localStorage.getItem('token')
  //   const {data} = await http(token).get('/profile')
  //   setUserProfile(data.result)
  // }

  React.useEffect(()=>{
    //getProfile();
    const token = window.localStorage.getItem('token');
    if(!userProfile?.fullName){
      dispatch(profileAction.getDataUser({token}))
    }
  },[])

  return (
    <div>
      <div>
        Full Name:
        {' '}
        {userProfile?.fullName}
      </div>
      <div>
        Birthdate:
        {' '}
        {userProfile?.birthDate}
      </div>
      <div>
        Picture:
        {' '}
        {userProfile?.picture}
      </div>
      {userProfile?.picture && <img style={{ width : '250px', height : '100%' }} src={`http://localhost:8888/assets/uploads/${userProfile?.picture}`} alt={userProfile?.fullName} />}
      <div>
        <Link to="/profile/edit">Edit Profile</Link>
        <br />
        <button onClick={()=>dispatch(profileReducerAction.resetProfile())}>Reset data Redux</button>
      </div>
    </div>
  )
}

export default Profile;
