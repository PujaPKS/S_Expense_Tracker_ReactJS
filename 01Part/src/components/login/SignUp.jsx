import { useState, useRef } from 'react';

import './SignUp.css';

const SignUp = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current?.value; // Retrieving confirm password value

    if (!isLogin && enteredPassword !== enteredConfirmPassword) {
      alert('Passwords do not match!'); // Alert for mismatched passwords
      return;
    }

    setIsLoading(true);
    //optional: Add Validation
    if(isLogin){

    }
    else{
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBTuARjfplXy5aA6LBws6I4kTS42MpEa-A',
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        setIsLoading(false);
        if(res.ok){
          //...
        }
        else{
          return res.json() .then(data => {
            // //show an error modal
            // console.log(data);
            let errorMesssage = 'Authentication Failed!';
            if(data && data.error && data.error.message){
              errorMesssage = data.error.message
            }
            alert(errorMesssage);
          })
        }
      });
    }
  }

  return (

    <section >
      <form onSubmit={submitHandler}>
      <div className= 'auth'>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <div className='control'>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className='control'>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef}/>
        </div>
        
        {!isLogin && ( // Add Confirm Password field only for Sign Up
          <div className="control">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              required
              ref={confirmPasswordInputRef} // Added ref for confirm password
            />
          </div>
        )}
    
        <div className='actions'>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending Request...</p>}
          <button
            type='button'
            className='toggle'
            onClick={switchAuthModeHandler}
          />
        </div>
        </div>

        <div className="submit">
          <p>
            {isLogin ? (
              <>
                Don’t have an account?{' '}
                <button type="button" className="toggle" onClick={switchAuthModeHandler}>
                  Create Here
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button type="button" className="toggle" onClick={switchAuthModeHandler}>
                  Login Here
                </button>
              </>
            )}
          </p>
        </div>

      </form>
    </section>
  );
};

export default SignUp;