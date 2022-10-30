import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import http from '../helpers/http';
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup)

function Login() {
  const navigate = useNavigate()
  // const submitAction = async (e) => {
  //   try{
  //     e.preventDefault();
  //     const form = {
  //       email: e.target.email.value,
  //       password: e.target.password.value,
  //     };
  //     const encoded = new URLSearchParams(form);
  //     const {data} = await http().post('/auth/login', encoded.toString());
  //     window.localStorage.setItem("token", data.results.token);
  //     navigate('/');
  //   }catch(err){
  //     window.alert(err.response.data.message);
  //   }
  // }

  const basicAuthSchema = Yup.object().shape({
    email: Yup.string().email('Email is not Valid!').required(),
    password : Yup.string().password().required()
  })


  const submitAction = async (values) => {
    try{
      const form = new URLSearchParams(values)
      const { data } = await http().post('/auth/login', form.toString());
      window.localStorage.setItem("token", data.results.token);
      navigate('/');
    }catch(err){
      window.alert(err.response.data.message);
    }
  }

  return (
    <>
    <Formik
      initialValues={{
        email : '',
        password : ''
      }}
      validationSchema={basicAuthSchema}
      onSubmit={submitAction}
    >
      {({errors, touched})=>(
        <Form>
        <Field type="email" name="email" />
        <br />
        {errors.email && touched.email ?(
            <div>{errors.email}</div>
          ) : null}
        <br />
        <Field type="password" name="password" />
        <br />
        {errors.password && touched.password ?(
            <div>{errors.password}</div>
          ) : null}
        <br />
        <button type='submit'>Login</button>
      </Form>
      )}

    </Formik>


    {/* <form onSubmit={submitAction}>
      <input type="email" name="email" />
      <br />
      <input type="password" name="password" />
      <br />
      <button type="submit">Login</button>
    </form> */}
    <div>
        <Link to="/forgot-password">Forgot Password</Link>
    </div>
    <div>
      <button type="submit" className='btnregister'>
        <Link to="/register">SignUp!</Link>
      </button>
    </div>

    </>

  );
}

export default Login
