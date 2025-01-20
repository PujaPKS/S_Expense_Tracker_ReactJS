import { Link, useNavigate } from 'react-router-dom';

import './MainNavigation.css';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const MainNavigation = () => {

  const authCtx = useContext(AuthContext); // Using the context to get logged-in status
  
  const isLoggedIn = authCtx.isLoggedIn; // Getting the logged-in status from the context 

  const navigate = useNavigate(); // Using the navigate function from react-router-dom to navigate between routes

  //Function to handle logout of the user
  const logoutHandler = () => {
    authCtx.logout(); // Calling the logout function from AuthContext
    navigate('/login'); // Navigating to the root route after logging out to login page
  }
  
  return (
    <header className='header'>
      <Link to='/'>
        <div className='logo'>Expense Tracker</div>
      </Link>
      <nav>
        <ul>

          {!isLoggedIn && (
            <li>
              <Link to='/'>
                <button>Login</button>
              </Link>
            </li>
          )}

          {isLoggedIn && (
          <div className='headerList'>
            <button>
              <Link to='/expense'>Expense</Link>
            </button>
          {/* )}

          {isLoggedIn && ( */}
            <button>
              <Link to='/profile'>Profile</Link>
            </button>
          </div>
          )}

          {isLoggedIn &&(
            <li>
              <button onClick={logoutHandler} className='logout'>Logout</button>
            </li>
          )}
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;