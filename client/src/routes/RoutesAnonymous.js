import React from 'react'
import { Route, Routes } from 'react-router-dom'

const RoutesAnonymous = () => {
  return (
    <Routes>    
        <Route path="/" element={<div>login</div>} />
        <Route path="signup" element={<div>sign up</div>} />
    </Routes>
  )
}

export default RoutesAnonymous