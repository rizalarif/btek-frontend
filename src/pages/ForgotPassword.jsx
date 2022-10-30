import React from 'react';
import { useNavigate } from 'react-router-dom';
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
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={basicAuthSchema}
      onSubmit={submitAction}
    >
      {({ errors, touched }) => (
        <Form>
          Email :
          <Field type="text" name="email" />
          <br />
          {errors.email && touched.email ? (
            <div>{errors.email}</div>
          ) : null}
          <br />
          <button type="submit">Send</button>
        </Form>
      )}
    </Formik>
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



