import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RegisterView from '../views/RegisterView'

const RoutesAnonymous = () => {
  return (
    <Routes>    
        <Route path="/" element={<div>login</div>} />
        <Route path="register" element={<RegisterView />} />
    </Routes>
  )
}

export default RoutesAnonymous