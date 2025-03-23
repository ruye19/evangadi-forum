import React, { useEffect, useState, createContext } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axiosConfig from './api/axiosConfig';

export const AppState = createContext();

const App = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Fetch user from the backend to verify token
  async function checkUser() {
    try {
      const { data } = await axiosConfig.get('/user/checkuser', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user)); // Save user info
    } catch (error) {
      console.log(error.response);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  }

  useEffect(() => {
    // If user info exists in localStorage, set it
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // Always check the token with backend
    if (token) {
      checkUser();
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AppState.Provider>
  );
};

export default App;
