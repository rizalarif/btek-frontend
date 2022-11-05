import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import YupPassword from 'yup-password';
import * as Yup from 'yup';
// import http from '../helpers/http'
import * as authAction from '../redux/asyncActions/auth';
import * as authReset from '../redux/reducers/auth';

YupPassword(Yup);

function ResetPassword() {

  const navigate = useNavigate();

  const basicAuthSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required(),
    code: Yup.number().min(6).required(),
    newPassword: Yup.string().password().required(),
  });

  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth);

  const submitAction = async (values) => {
    try {
      // const form = new URLSearchParams(values);
      // await http().post('/auth/reset-password', form.toString());
      // navigate('/login');
      dispatch(authAction.resetPassword(values));
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };

  React.useEffect(() => {
    if (store.user.email) {
      dispatch(authReset.handleReset());
      navigate('/login');
    }
  }, [store]);

  return (
    <>
      <div className='h-screen flex justify-center items-center'>
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
              <label htmlFor="code">Secret Code</label> <br />
              <Field type="text" name="code" className="input input-bordered w-full max-w-xs hover:input-primary" />
              <br />
              {errors.code && touched.code ? (
                <div className='mb-3'>{errors.code}</div>
              ) : null}
              <label htmlFor="email">Email</label><br />
              <Field type="text" name="email" className="input input-bordered w-full max-w-xs hover:input-primary" />
              <br />
              {errors.email && touched.email ? (
                <div className='mb-3'>{errors.email}</div>
              ) : null}

              <label htmlFor="password">New Password</label><br />
              <Field type="password" name="newPassword" className="input input-bordered w-full max-w-xs hover:input-primary" />
              <br />
              {errors.newPassword && touched.newPassword ? (
                <div className='mb-3'>{errors.newPassword}</div>
              ) : null}

              <label htmlFor="password">Confirm Password</label>
              <br />
              <Field type="password" name="confirmPassword" className="input input-bordered w-full max-w-xs hover:input-primary" />
              <br />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div>{errors.confirmPassword}</div>
              ) : null}
              <br />

              <button type="submit" className='btn mt-5 btn-primary block w-full'>Send</button>
            </Form>
          )}
        </Formik>
      </div>
    </>
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

