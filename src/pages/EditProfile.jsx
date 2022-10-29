import React from 'react'
import http from '../helpers/http'
import { Link } from 'react-router-dom'

function EditProfile() {
  const [userProfile, setUserProfile] = React.useState({})
  const getProfile = async () => {
    const token = window.localStorage.getItem('token')
    const {data} = await http(token).get('/profile')
    setUserProfile(data.result)
  };

  const saveData = async (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem('token');

    const form = new FormData()
    form.append("fullName", e.target.fullName.value);
    form.append("birthDate", e.target.birthDate.value);
    form.append("picture", e.target.picture.files[0]);

    const {data} = await http(token).put('/profile', form, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    setUserProfile(data.results);
    window.alert('Update data success!');
  };

  React.useEffect(()=>{
    getProfile()
  },[])

  return (
    <>
    {userProfile?.picture && <img style={{ width : '250px', height : '100%' }} src={`http://localhost:8888/assets/uploads/${userProfile?.picture}`} alt={userProfile?.fullName} />}
    <form onSubmit={saveData}>
      <div>
        Full Name:
        <br />
        <input type="text" name="fullName" defaultValue={userProfile?.fullName} />
      </div>
      <div>
        Birthdate:
        <br />
        <input type="text" name="birthDate" defaultValue={userProfile?.birthDate} />
      </div>
      <div>
        Picture:
        <br />
        <input type="file" name="picture" />
      </div>
      <button type="submit">Save</button>
    </form>
    </>
  )
}

export default EditProfile;
