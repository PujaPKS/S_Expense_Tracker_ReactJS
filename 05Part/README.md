Edit User Details

Problem with the current app

When the user has updated his profile and if he refreshes the page , the data saved in profile page is lost. It again shows incomplete
The data is saved in the database of firebase
You just have to make a GET request to firebase api with the idToken, refer to this doc(https://firebase.google.com/docs/reference/rest/auth#section-get-account-info)
Whatever data you get pre-fill the input form with that data show that the user can see his previously entered values and edit that if needed

Made Update working successfully through ProfileForm.jsx file.
