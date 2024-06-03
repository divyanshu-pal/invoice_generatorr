

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../app/store';
import { register } from '../features/user/UserSlice';

const Register: React.FC = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.user);

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleValidation = () => {
    let valid = true;
    const { name, email, password } = values;

    if (name.length < 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: 'Username should be greater than 3 characters',
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
    }

    if (password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password should be greater than 8 characters',
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    }

    if (email === '') {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Email is required' }));
      valid = false;
    } else if (!validateEmail(email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email' }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    }

    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (handleValidation()) {
      const { name, email, password } = values;
      dispatch(register({ name, email, password }))
        .unwrap()
        .then(() => {
          navigate('/login');
        })
        .catch((err) => {
          console.error('Registration error:', err);
        });

      setValues({
        name: '',
        email: '',
        password: '',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-gradient-to-r from-blue-500 to-green-500">
    <div className="container max-w-md p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center mb-6">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={values.name}
            onChange={handleChange}
            name="name"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={values.email}
            onChange={handleChange}
            name="email"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={values.password}
            onChange={handleChange}
            name="password"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-md shadow-sm hover:bg-green-400 disabled:opacity-50"
        >
          Register
        </button>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
    </div>
  </div>
  );
};

export default Register;

