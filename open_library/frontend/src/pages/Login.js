import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '../store/authStore';
import Loader from '../components/Loader';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { register, login, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (email.trim() === '' || password.trim() === '') {
      setError('All fields are required!');
      return;
    }

    if (isLogin) {
      try {
        await login({
          email,
          password,
        });
        navigate('/');
      } catch (error) {
        setError(error?.response?.data?.message || 'Something went wrong');
        console.error(error);
      }
    } else {
      if (firstName.trim() === '' || lastName.trim() === '') {
        setError('All fields are required!');
        return;
      }

      try {
        await register({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        });
        navigate('/');
      } catch (error) {
        setError(error?.response?.data?.message || 'Something went wrong');
        console.error(error);
      }
    }
  };

  return (
    <div className='login'>
      <h2 className='text-white text-uppercase fs-26 fw-600'>
        {isLogin ? 'Login' : 'Register'}
      </h2>
      <form onSubmit={handleSubmit} className='flex flex-column'>
        {!isLogin && (
          <>
            <input
              type='text'
              className='form-control'
              placeholder='First Name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type='text'
              className='form-control'
              placeholder='Last Name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}
        <input
          type='email'
          className='form-control'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          className='form-control'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className='error'>{error}</div>}

        <button type='submit' disabled={isLoading}>
          {isLoading ? <Loader /> : isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <p className='handler' onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? 'Dont have an account? Register here'
          : 'Already have an account? Login here'}
      </p>
    </div>
  );
};

export default Login;
