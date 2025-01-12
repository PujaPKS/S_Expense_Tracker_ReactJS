import React, { useContext } from 'react'
import './App.css';
import Header from './components/header/Header';
import Signup from './components/login/SignUp';
import { Navigate, Route, Routes } from 'react-router-dom';
import Profile from './components/profile/Profile';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import Expenses from './components/expenses/Expenses';
import AuthContext from './context/AuthContext';

const App = () => {

  const authCtx = useContext(AuthContext);
  
  return (
    <div>
      <Header>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path='/login' element={<Signup />} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />

          {/* Protecting url from directly navigating if user is not logged in by using AUthContext and Navigate*/}
          {/* If any url is typed and user is not logged in then it will be redirected to login page */}
          <Route path="/profile"
            element={authCtx.isLoggedIn ? <Profile /> : <Navigate to="/login" />}
          />
          {/* Connected Expenses element to the route */}
          <Route path='/expense' 
            element={authCtx.isLoggedIn ? <Expenses/> : <Navigate to='/login' />} 
          />  
        </Routes>
      </Header>
    </div>
  )
}

export default App