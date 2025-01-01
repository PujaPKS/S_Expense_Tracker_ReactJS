Forgot Password Workflow
\
Problem

Once the user has logged Out , there is a very high chance that he might forget the password.
What do we do now


Solution

Add a forgot password button so that when the user clicks on it https://drive.google.com/file/d/1P0HWepSUWoY7a7akbtPti07ZbqdPiRhr/view?usp=sharing, it should open a page like this(https://drive.google.com/file/d/1t4_DtZSNJlQ3RwveBkYKgzGrsHnEhK2I/view)
Once the user enters the mail id call the firebase API and show a loader on the screen uptill the response doesnt come from firebase api. Follow this doc(https://firebase.google.com/docs/reference/rest/auth#section-send-password-reset-email)
You would recieve a password reset link in your mail id which you entered above.
Open the link and change the password.
Now try logging into your website via the new password and it should work


Main changes for making Forgot pasword work property is made in --->
1. Forgot password button is added in the  SignUp.jsx
2. Forgot password accessed in App.jsx file
3. MainNavigation.jsx code is modified for connecting Login Button to Login page
4. ForgotPassword.jsx file is created for handling forgot password functionality and forgot password form
5. ForgotPassword.css file is created for styling the forgot password page