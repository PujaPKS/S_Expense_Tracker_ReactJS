import { Link } from 'react-router-dom';

import './MainNavigation.css';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const MainNavigation = () => {

  const authCtx = useContext(AuthContext); // Using the context to get logged-in status
  
  const isLoggedIn = authCtx.isLoggedIn; // Getting the logged-in status from the context 
  
  return (
    <header className='header'>
      <Link to='/'>
        <div className='logo'>Expense Tracker</div>
      </Link>
      <nav>
        <ul>

          {!isLoggedIn && (
            <li>
              <Link to='/'>Login</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Link to='/expense'>Expense</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          )}

          {isLoggedIn &&(
            <li>
              <Link to='/logout'>Logout</Link>
            </li>
          )}
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;