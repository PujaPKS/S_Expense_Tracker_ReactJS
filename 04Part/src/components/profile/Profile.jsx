import React, { useState } from 'react';
import './Profile.css';
import ProfileForm from './ProfileForm';

const Profile = () => {
  const [updateProfile, setUpdateProfile] = useState(false); //handles the profile form when complete now button is clicked

  const handleCompleteProfile = () => {
    setUpdateProfile(true);  // Showing the form when "Complete Now" is clicked
  };

  const closeForm = () => {
    setUpdateProfile(false);  // Hiding the form when "Cancel" button is clicked
  };

  return (
    <div>
      <div className="profile-header">
        <div className="profile-container">
          <h1 className="profile-head">
            {updateProfile ? "Winners never quit, Quitters never win." : "Welcome to Expense Tracker !!!"}
          </h1>
          <div className="profile-update">
            {updateProfile 
              ? (
                <span>
                  Your profile is <span className="bold-text">64%</span> complete. A complete Profile has higher chances of landing a job.
                </span>
              )
              : "Your Profile is incomplete."}
             <a onClick={handleCompleteProfile}>Complete Now</a>
          </div>
        </div>
      </div>

      {/* Conditionally rendering ProfileForm */}
      {updateProfile && <ProfileForm closeForm = {closeForm} />}
    </div>
  );
};

export default Profile;

