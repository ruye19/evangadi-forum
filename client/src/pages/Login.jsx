import React, { useRef } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = emailDom.current.value;
    const password = passwordDom.current.value;

    if (!email || !password) {
      alert('Please fill all fields');
      return;
    }

    try {
      const { data } = await axios.post('/user/login', {
        email,
        password,
      });

      alert('Login successful');
      console.log(data.token);

      // Store both token and user
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user)); // Assuming backend sends user info
      console.log('Token from localStorage:', localStorage.getItem('token'));
      navigate('/');
    } catch (error) {
      console.log(error.response?.data?.msg);
      alert(error.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input ref={emailDom} type="email" required />
        </div>
        <div>
          <label>Password:</label>
          <input ref={passwordDom} type="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;