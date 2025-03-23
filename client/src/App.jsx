import React, { useEffect } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { Route, Routes } from 'react-router'
import axiosConfig from './api/axiosConfig'
import { useNavigate } from 'react-router'

const App = () => {
const navigator = useNavigate();
const token=localStorage.getItem('token')
async function checkUser() {
  try {
    await axiosConfig.get('/user/checkuser', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
  } catch (error) {
    console.log(error.response);
    navigator('/login')
    
  }
}
useEffect(() => {
  checkUser()

}, [])



  return (
    <div className="App">
     <Routes>
       
          <Route path="/" exact element={<Home />} />
          <Route path="/login"  element={<Login />} />
          <Route path="/register" element={<Register />} />
       
     </Routes>
      
    </div>
  )
}

export default App
