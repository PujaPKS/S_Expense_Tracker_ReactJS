import React from 'react';
import './ProfileForm.css';

const ProfileForm = ({closeForm}) => {

  const handleCancel = () => {
    alert('Cancelled');  // Show the alert message
    closeForm();         // Close the form
  };

  return (
    <div className="profile-form">
      <div className="form-header">
        <h1>Contact Details</h1>
        <button className="cancel" type="button" onClick={(handleCancel)}>Cancel</button>
      </div>
      <form>
        <div className="form-row">
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" id="fullName" placeholder="Enter your name" required/>
        </div>

        <div className="form-row">
          <label htmlFor="profilePhotoUrl">Profile Photo URL:</label>
          <input type="url" id="profilePhotoUrl" placeholder="Enter your profile photo URL" />
        </div>

        <button className='submit' type="submit">Update</button>
      </form>
    </div>
  );
};

export default ProfileForm;
