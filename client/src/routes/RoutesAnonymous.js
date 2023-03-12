import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginView from '../views/LoginView'
import RegisterView from '../views/RegisterView'

const RoutesAnonymous = () => {
  return (
    <Routes>    
        <Route path="/" element={<div>login</div>} />
        <Route path="register" element={<RegisterView />} />
        <Route path="login" element={<LoginView />} />
    </Routes>
  )
}

export default RoutesAnonymous