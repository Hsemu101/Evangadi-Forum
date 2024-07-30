import React from 'react'
import Home from './assets/Components/Home'
import Regester from './assets/Components/Regester'
import Login from './assets/Components/Login'
import {Route, Routes } from "react-router-dom"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="Regester" element={<Regester/>}/>
        <Route path="Login" element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App