Logout User

Deliverable

Add a logout button at the top
When the user clicks on it redirect the user to the login page
Clear the idToken stored in local storage

Main changes for making logout button work property is made in --->
1. AuthProvider.jsx file, where we added a logout function and call it when the user clicks on the logout button.
2. MainNavigation.jsx file, where we added a logout button and call the logout function when clicked.