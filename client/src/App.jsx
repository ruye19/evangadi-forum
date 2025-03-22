import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { Route, Routes } from 'react-router'


const App = () => {
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
