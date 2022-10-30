import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import YupPassword from 'yup-password';
import * as Yup from 'yup';
import http from '../helpers/http'

YupPassword(Yup);

function ResetPassword() {

  const navigate = useNavigate();

  const basicAuthSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required(),
    code: Yup.number().min(6).required(),
    newPassword: Yup.string().password().required(),
  });

  const submitAction = async (values) => {
    try {
      const form = new URLSearchParams(values);
      await http().post('/auth/reset-password', form.toString());
      navigate('/login');
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };
  return (
    <Formik
      initialValues={{
        email: '',
        code: '',
        newPassword: '',
        confirmPassword: '',
      }}
      validationSchema={basicAuthSchema}
      onSubmit={submitAction}
    >
      {({ errors, touched }) => (
        <Form>
          Secret Code :
          <Field type="text" name="code" />
          <br />
          {errors.code && touched.code ? (
            <div>{errors.code}</div>
          ) : null}
          <br />
          Email :
          <Field type="text" name="email" />
          <br />
          {errors.email && touched.email ? (
            <div>{errors.email}</div>
          ) : null}
          <br />
          New Password :
          <Field type="password" name="newPassword" />
          <br />
          {errors.newPassword && touched.newPassword ? (
            <div>{errors.newPassword}</div>
          ) : null}
          <br />
          Confirm Password :
          <Field type="password" name="confirmPassword" />
          <br />
          {errors.confirmPassword && touched.confirmPassword ? (
            <div>{errors.confirmPassword}</div>
          ) : null}
          <br />
          <button type="submit">Send</button>
        </Form>
      )}
    </Formik>
  );
}

export default ResetPassword;
    // <form onSubmit={resetAction}>
    //   Code :
    //   <br />
    //   <input type="number" name="code" />
    //   <br />
    //   Email :
    //   <br />
    //   <input type="email" name="email" />
    //   <br />
    //   New Password :
    //   <br />
    //   <input type="password" name="newPassword" />
    //   <br />
    //   Confirm Password :
    //   <br />
    //   <input type="password" name="confirmPassword" />
    //   <br />
    //   <button type="submit">Submit</button>
    // </form>

