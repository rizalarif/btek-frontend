import React from 'react'
import { useNavigate, Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import * as authAction from '../redux/asyncActions/auth';

// import http from '../helpers/http';
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

  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth);

  const submitAction = async (values) => {
    try{
      // const form = new URLSearchParams(values)
      // const { data } = await http().post('/auth/login', form.toString());
      // window.localStorage.setItem("token", data.results.token);
      // navigate('/');
      dispatch(authAction.login(values));
    }catch(err){
      window.alert(err.response.data.message);
    }
  };

  React.useEffect(() => {
    if (store.user.token) {
      window.localStorage.setItem('token', store.user.token);
      navigate('/');
    }
  }, [store]);

  return (
    <>
      <div className='h-screen flex justify-center items-center'>
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
            <h1 className='text-center mb-6 text-2xl'>WELCOME TO REACT APP</h1>
            <label htmlFor="email">Email</label>
            <Field className="input input-bordered w-full max-w-xs hover:input-primary" type="email" name="email" />
            <br />
            {errors.email && touched.email ?(
                <div className='text-red-400'>{errors.email}</div>
              ) : null}
            <br />
            <label htmlFor="password">Password</label>
            <Field className="input input-bordered w-full max-w-xs hover:input-primary" type="password" name="password" />
            <br />
            {errors.password && touched.password ?(
                <div className='text-red-400'>{errors.password}</div>
              ) : null}
            <Link className='mt-2 text-sm hover:text-stone-700' to="/forgot-password">Forgot your password?</Link>
            <button className='btn mt-5 btn-primary block w-full' type='submit'>Login</button>
            <p className='text-sm text-center mt-5'>
              New User? <Link className='underline hover:text-stone-700' to="/register">SignUp!</Link>
            </p>
          </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Login
