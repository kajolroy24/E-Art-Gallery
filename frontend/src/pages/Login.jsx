import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  
  // Validation state
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle state

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return passwordPattern.test(password);
  };

  const validateForm = () => {
    let formErrors = {};

    if (currentState === 'Sign Up' && name.length < 3) {
      formErrors.name = 'Name should be at least 3 characters long.';
    }

    if (!validateEmail(email)) {
      formErrors.email = 'Please enter a valid email.';
    }

    if (!validatePassword(password)) {
      formErrors.password = 'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post( backendUrl + '/api/user/register', { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post( backendUrl + '/api/user/login', { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          toast.success(response.data.message);
          console.log();
          
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: `url(${assets.login_bg})`, backgroundSize: 'cover' }}>
      <form onSubmit={onSubmitHandler} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-5 text-teal-700 text-center">{currentState}</h2>
        {currentState === 'Sign Up' && (
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-yellow-500 focus:border-2 ${
                errors.name ? 'border-red-500' : ''
              }`}
              placeholder="Enter your name"
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-yellow-500 focus:border-2 ${
              errors.email ? 'border-red-500' : ''
            }`}
            placeholder="Enter your email"
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={showPassword ? 'text' : 'password'} // Toggle between password and text
            className={`w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:border-yellow-500 ${
              errors.password ? 'border-red-500' : ''
            }`}
            placeholder="Enter your password"
            required
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          
          {/* Eye Icon for toggling password visibility */}
          <div 
            className="absolute inset-y-0 right-3 flex items-center mt-6 cursor-pointer" 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash className="text-teal-600" /> : <FaEye className="text-teal-600" />}
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <a href="#" className="text-sm text-yellow-500 hover:underline">
            Forgot your password?
          </a>
          <button
            type="button"
            onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
            className="text-sm text-yellow-500 hover:underline"
          >
            {currentState === 'Login' ? 'Create Account' : 'Login'}
          </button>
        </div>
        <button type="submit" className="w-full bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-yellow-500">
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Login;
