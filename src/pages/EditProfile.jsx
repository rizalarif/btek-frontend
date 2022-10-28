import React from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../helpers/http';

function EditProfile() {
  const navigate = useNavigate();
  const updateAction = async (e) => {
    try {
      e.preventDefault();
      const form = {
        fullName: e.target.fullName.value,
        picture: e.target.picture.value,
        birthDate: e.target.birthDate.value,
      };
      const encoded = new URLSearchParams(form);
      const { data } = await http().put('/profile', encoded.toString());
      window.localStorage.getItem('token', data.results.token);
      navigate('/profile');
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };
  return (
    <form onSubmit={updateAction}>
      Full Name :
      <br />
      <input type="text" name="fullName" />
      <br />
      Picture :
      <br />
      <input type="text" name="picture" />
      <br />
      Birth Date :
      <br />
      <input type="text" name="birthDate" />
      <br />
      <button type="submit">Save</button>
    </form>
  );
}

export default EditProfile;
