import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik';
import YupPassword from 'yup-password';
import * as Yup from 'yup';
import http from '../helpers/http';


YupPassword(Yup);

function Register() {
  //Navigate
  const navigate = useNavigate();
  const basicAuthSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required(),
    password: Yup.string().password().required(),
  });

  const submitAction = async (values) => {
    try {
      const form = new URLSearchParams(values);
      await http().post('/auth/register', form.toString());
      navigate('/login');
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={basicAuthSchema}
      onSubmit={submitAction}
    >
      {({ errors, touched }) => (
        <Form>
          <Field type="text" name="email" />
          <br />
          {errors.email && touched.email ? (
            <div>{errors.email}</div>
          ) : null}
          <br />
          <Field type="password" name="password" />
          <br />
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
          <br />
          <button type="submit">Register</button>
        </Form>
      )}
    </Formik>
  );
}

export default Register;

  // const register = async (e) => {
  //   try {
  //     e.preventDefault();
  //     const form = {
  //       email: e.target.email.value,
  //       password: e.target.password.value,
  //     };
  //     const encoded = new URLSearchParams(form);
  //     const {data} = await http().post('/auth/register', encoded.toString());
  //     window.localStorage.setItem('token', data.results.token);
  //     navigate('/login');
  //   } catch (err) {
  //     window.alert(err.response.data.message);
  //   }
  // };

  // User Interface
  // return (
  //   <form onSubmit={register}>
  //     <h3>Welcome To Register ReactJS!</h3>
  //     Email:<br/><input type="email" name="email" id="email" />
  //     <br/>
  //     Password:
  //     <br/>
  //     <input type="password" name="password" id="" />
  //     <br />
  //     <button>Submit</button>
  //   </form>
  // )



