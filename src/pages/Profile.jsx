import React from 'react'
import http from '../helpers/http'
import { Link } from 'react-router-dom'

function Profile() {
  const [userProfile, setUserProfile] = React.useState({})
  const getProfile = async () => {
    const token = window.localStorage.getItem('token')
    const {data} = await http(token).get('/profile')
    setUserProfile(data.result)
  }

  React.useEffect(()=>{
    getProfile()
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
      <div>
        <Link to="/edit-profile">Edit Profile</Link>
      </div>
    </div>
  )
}

export default Profile;
