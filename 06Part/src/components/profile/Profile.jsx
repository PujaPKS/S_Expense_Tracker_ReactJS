// import React, { useState } from 'react';
// import './Profile.css';
// import ProfileForm from './ProfileForm';

// const Profile = () => {
//   const [updateProfile, setUpdateProfile] = useState(false); //handles the profile form when complete now button is clicked

//   const handleCompleteProfile = () => {
//     setUpdateProfile(true);  // Showing the form when "Complete Now" is clicked
//   };

//   const closeForm = () => {
//     setUpdateProfile(false);  // Hiding the form when "Cancel" button is clicked
//   };

//   return (
//     <div>
//       <div className="profile-header">
//         <div className="profile-container">
//           <h1 className="profile-head">
//             {updateProfile ? "Winners never quit, Quitters never win." : "Welcome to Expense Tracker !!!"}
//           </h1>
//           <div className="profile-update">
//             {updateProfile 
//               ? (
//                 <span>
//                   Your profile is <span className="bold-text">64%</span> complete. A complete Profile has higher chances of landing a job.
//                 </span>
//               )
//               : "Your Profile is incomplete."}
//              <a onClick={handleCompleteProfile}>Complete Now</a>
//           </div>
//         </div>
//       </div>

//       {/* Conditionally rendering ProfileForm */}
//       {updateProfile && <ProfileForm closeForm = {closeForm} />}
//     </div>
//   );
// };

// export default Profile;



//Adding logic for verifying email id.

import React, { useState, useContext, useEffect } from 'react';
import './Profile.css';
import ProfileForm from './ProfileForm';
import AuthContext from '../../context/AuthContext';

const Profile = () => {
  const [updateProfile, setUpdateProfile] = useState(false); // for handling profile form visibility when complete now button is clicked
  const [isEmailVerified, setIsEmailVerified] = useState(false); // for tracking email verification status
  const authCtx = useContext(AuthContext); // Accessing AuthContext to get logged in user info

  //handling email verification
  useEffect(() => {
    // Checking if email is verified
    if (authCtx.currentUser && authCtx.currentUser.emailVerified) {
      setIsEmailVerified(true);
    } else {
      setIsEmailVerified(false);
    }
  }, [authCtx.currentUser]);

  const handleCompleteProfile = () => {
    setUpdateProfile(true); // Showing the profile form
  };

  const closeForm = () => {
    setUpdateProfile(false); // Hiding the profile form
  };

  const handleVerifyEmail = async () => {
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBTuARjfplXy5aA6LBws6I4kTS42MpEa-A',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requestType: 'VERIFY_EMAIL',
            idToken: authCtx.token, // Sends the user's ID token
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert('Verification email sent! Please check your inbox.');
      } 
      else {
        throw new Error(data.error.message || 'Failed to send verification email.');
      }
    } 
    catch (error) {
      console.error('Error sending email verification:', error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="profile-header">
        <div className="profile-container">
          <h1 className="profile-head">
            {updateProfile
              ? 'Winners never quit, Quitters never win.'
              : 'Welcome to Expense Tracker !!!'}
          </h1>
          <div className="profile-update">
            {updateProfile ? (
              <span>
                Your profile is <span className="bold-text">64%</span> complete. A complete Profile has higher chances of landing a job.
              </span>
            ) : (
              'Your Profile is incomplete.'
            )}
            <a onClick={handleCompleteProfile}>Complete Now</a>
          </div>
        </div>
      </div>

      {/* Email verification section */}
      {!isEmailVerified && (
        <button className='email-verification' onClick={handleVerifyEmail}>Verify Email</button>
      )}

      {/* Conditionally rendering the ProfileForm */}
      {updateProfile && <ProfileForm closeForm={closeForm} />}
    </div>
  );
};

export default Profile;
