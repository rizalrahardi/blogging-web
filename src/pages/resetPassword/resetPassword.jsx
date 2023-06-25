import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ResetPassword
 = () => {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        'https://minpro-blog.purwadhikabootcamp.com/api/auth/resetPass',
        values,
        config
      );
      console.log(response.data); // Handle the API response as needed
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords don't match")
      .required('Required'),
  });

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-1">
              Password:
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="border rounded w-full p-2"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block font-medium mb-1">
              Confirm Password:
            </label>
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="border rounded w-full p-2"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Reset Password
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ResetPassword
;
