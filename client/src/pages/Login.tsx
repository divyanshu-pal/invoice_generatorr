import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { AppDispatch, RootState } from '../app/store';
import { login} from '../features/user/UserSlice';
const Login = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.user);
  const [values, setValues] = useState({
   
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
   
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    // Regular expression for validating email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleValidation = () => {
    const { email, password } = values;
    let valid = true;

    

    if (password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password should be greater than 8 characters",
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }

    if (email === "") {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Email is required" }));
      valid = false;
    } else if (!validateEmail(email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Invalid email" }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (handleValidation()) {
      const { email, password } = values;

    

      // try {
      //   // const { data } = await axios.post('https://invoice-api-31x7.onrender.com/api/auth/login', {
      //     const { data } = await axios.post('http://localhost:5000/api/auth/login', {
      //     email,
      //     password,
      //   });
      //   console.log(data);

      //   if (data) {
      //     navigate('/add-product');
      //   } else {
      //     console.log(data.message);
      //   }
      // } catch (error) {
      //   console.error('Error:', error);
      // }


      dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/add-product');
      })
      .catch((err) => {
        console.error('login error:', err);
      });

    setValues({
     
      email: '',
      password: '',
    });
    }

    // setValues({
   
    //   email: "",
    //   password: "",
    // })
  };

  return (
<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
<div className="container max-w-md p-8 bg-white rounded-lg shadow-md">
  <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
  <form onSubmit={handleSubmit} className="space-y-6">
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        id="email"
        value={values.email}
           onChange={(e) => setValues({ ...values, email: e.target.value })}
        name="email"
        required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
      {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
    </div>
    <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
      <input
        type="password"
        id="password"
        value={values.password}
         onChange={(e) => setValues({ ...values, password: e.target.value })}
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
      Login
    </button>
    
  </form>
</div>
</div>

  );
};

export default Login;
