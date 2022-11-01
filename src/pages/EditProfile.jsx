import React from 'react'
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import YupPassword from 'yup-password';
import * as Yup from 'yup';
// import http from '../helpers/http'
import {useSelector, useDispatch} from 'react-redux'
import * as profileAction from '../redux/asyncActions/profile'

YupPassword(Yup);

function EditProfile() {

  const editProfileSchema = Yup.object().shape({
    fullName: Yup.string().required(),
    birthDate: Yup.string().required(),
    picture: Yup.mixed().required(),
  });

  const dispatch = useDispatch()
  const userProfile = useSelector(state => state.profile.user)

  const [file, setFile] = React.useState(null);
  const submitAction = (e) => {
    const token = window.localStorage.getItem('token');
    const data = {
      fullName: e.fullName,
      birthDate: e.birthDate,
      picture: e.picture,
    };

    dispatch(profileAction.editData({ token, data }));
  };
  // const [userProfile, setUserProfile] = React.useState({});
  // const getProfile = async () => {
  //   const token = window.localStorage.getItem('token');
  //   const { data } = await http(token).get('/profile');
  //   setUserProfile(data.results);
  // };

  // const submitAction = async (values) => {
  //   const token = window.localStorage.getItem('token');

  //   const form = new FormData();
  //   form.append('fullName', values.fullName);
  //   form.append('birthDate', values.birthDate);
  //   form.append('picture', values.picture);

  //   const { data } = await http(token).put('/profile', form, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   });
  //   setUserProfile(data.results);
  //   navigate('/profile');
  // };

  React.useEffect(() => {
    // getProfile();
    const token = window.localStorage.getItem('token');
    if(!userProfile?.fullName){
      dispatch(profileAction.getDataUser({token}))
    }
  }, []);

  return (
    <>
      {userProfile?.picture && <img style={{ width : '250px', height : '100%' }} src={`http://localhost:8888/assets/uploads/${userProfile?.picture}`} alt={userProfile?.fullName} />}
      <Formik
        initialValues={{
          fullName: '',
          picture: '',
          birthDate: '',
        }}
        validationSchema={editProfileSchema}
        onSubmit={submitAction}
      >
        {({ errors, touched }) => (
          <Form>
            Full Name :
            <Field type="text" name="fullName" />
            <br />
            {errors.fullName && touched.fullName ? (
              <div>{errors.fullName}</div>
            ) : null}
            <br />
            Birth Date :
            <Field type="text" name="birthDate" />
            <br />
            {errors.birthDate && touched.birthDate ? (
              <div>{errors.birthDate}</div>
            ) : null}
            <br />
            Picture :
            <Field type="file" name="picture" />
            <br />
            {errors.picture && touched.picture ? (
              <div>{errors.picture}</div>
            ) : null}
            <br />
            <button type="submit">Save</button>
          </Form>
        )}
      </Formik>
      <Link to="/profile">Go to profile page</Link>
    </>
  );
}

export default EditProfile;

  // const [userProfile, setUserProfile] = React.useState({})
  // const getProfile = async () => {
  //   const token = window.localStorage.getItem('token')
  //   const {data} = await http(token).get('/profile')
  //   setUserProfile(data.result)
  // };

  // const saveData = async (e) => {
  //   e.preventDefault();
  //   const token = window.localStorage.getItem('token');

  //   const form = new FormData()
  //   form.append("fullName", e.target.fullName.value);
  //   form.append("birthDate", e.target.birthDate.value);
  //   form.append("picture", e.target.picture.files[0]);

  //   const {data} = await http(token).put('/profile', form, {
  //     headers: {
  //       "Content-Type": "multipart/form-data"
  //     }
  //   })
  //   setUserProfile(data.results);
  //   window.alert('Update data success!');
  // };

  // React.useEffect(()=>{
  //   getProfile()
  // },[])

  // return (
  //   <>
  //   {userProfile?.picture && <img style={{ width : '250px', height : '100%' }} src={`http://localhost:8888/assets/uploads/${userProfile?.picture}`} alt={userProfile?.fullName} />}
  //   <form onSubmit={saveData}>
  //     <div>
  //       Full Name:
  //       <br />
  //       <input type="text" name="fullName" defaultValue={userProfile?.fullName} />
  //     </div>
  //     <div>
  //       Birthdate:
  //       <br />
  //       <input type="text" name="birthDate" defaultValue={userProfile?.birthDate} />
  //     </div>
  //     <div>
  //       Picture:
  //       <br />
  //       <input type="file" name="picture" />
  //     </div>
  //     <button type="submit">Save</button>
  //   </form>
  //   </>
  // )



