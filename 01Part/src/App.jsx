import React from 'react'
import './App.css';
import Header from './components/header/Header';
import Signup from './components/login/SignUp';

const App = () => {
  return (
    <div>
      <Header>
        <Signup />
      </Header>
    </div>
  )
}

export default App