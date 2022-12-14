import React from 'react'
import { useNavigate, Link} from 'react-router-dom'
import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import YupPassword from 'yup-password';
import * as Yup from 'yup';
// import http from '../helpers/http';
import * as authAction from '../redux/asyncActions/auth';
import * as authReset from '../redux/reducers/auth';

YupPassword(Yup);

function Register() {
  //Navigate
  const navigate = useNavigate();
  const basicAuthSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required(),
    password: Yup.string().password().required(),
  });

  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth);

  const submitAction = async (values) => {
    try {
      // const form = new URLSearchParams(values);
      // await http().post('/auth/register', form.toString());
      // navigate('/login');
      dispatch(authAction.register(values));
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
            password: '',
          }}
          validationSchema={basicAuthSchema}
          onSubmit={submitAction}
        >
          {({ errors, touched }) => (
            <Form>
              <h1 className='text-2xl text-center'>React APP</h1>
              <h2 className='mb-5'>Sign up to see photos from your friends.</h2>
              <label htmlFor="email">Email</label>
              <br />
              <Field type="email" name="email" className="input input-bordered w-full max-w-xs hover:input-primary" />
              <br />
              {errors.email && touched.email ? (
                <div className='text-red-400'>{errors.email}</div>
              ) : null}
              <br />
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" className="input input-bordered w-full max-w-xs hover:input-primary"/>
              <br />
              {errors.password && touched.password ? (
                <div className='text-red-400'>{errors.password}</div>
              ) : null}
              <button className='btn mt-6 btn-primary block w-full' type="submit">Register</button>
              <p className='text-sm text-center mt-5'>
                Already have an account? <Link className='underline hover:text-stone-700' to="/">Login here</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </>
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



