import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import http from '../helpers/http';

function ForgotPassword() {
  const navigate = useNavigate();

  const basicAuthSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required(),
  });

  const submitAction = async (values) => {
    try {
      const form = new URLSearchParams(values);
      await http().post('/auth/forgot-password', form.toString());
      navigate('/reset-password');
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };

  // const forgotAction = async (e) => {
  //   try {
  //     e.preventDefault();
  //     const email = e.target.email.value;
  //     await http().post('/auth/forgot-password', email);
  //     navigate('/reset-password');
  //   } catch (err) {
  //     // eslint-disable-next-line no-alert
  //     window.alert(err.response.data.message);
  //   }
  // };

  return (
    <div className='h-screen flex justify-center items-center'>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={basicAuthSchema}
        onSubmit={submitAction}
      >
        {({ errors, touched }) => (
          <Form className='justify-center'>
            <h2 className='text-center text-lg'>Trouble Logging in?</h2>
            <p className='text-center'>Enter your email and we'll send you a code</p>
            <p className='text-center mb-5'>to get back into your account.</p>
            <label htmlFor="email">Email</label>
            <br />
            <Field type="text" name="email" className="input input-bordered hover:input-primary w-full"/>
            <br />
            {errors.email && touched.email ? (
              <div className='text-red-400'>{errors.email}</div>
            ) : null}
            <br />
            <button type="submit" className='btn btn-primary block w-full'>Send</button>
            <p className='text-sm text-center mt-5'>
              Create New User? <Link className='underline hover:text-stone-700' to="/register">SignUp!</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default ForgotPassword;

    // <form onSubmit={forgotAction}>
    //   Input email address, to send the confirmation code
    //   <br />
    //   <input type="email" name="email" />
    //   <br />
    //   <button type="submit">Submit</button>
    // </form>



