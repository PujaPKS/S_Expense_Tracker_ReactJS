import React from 'react'
import './App.css';
import Header from './components/header/Header';
import Signup from './components/login/SignUp';
import { Route, Routes } from 'react-router-dom';
import Profile from './components/profile/Profile';

const App = () => {
  return (
    <div>
      <Header>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path='/login' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Header>
    </div>
  )
}

export default App