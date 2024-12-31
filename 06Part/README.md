Verify User Email

Problem Statement

If you don't verify the Email Id , users can steal other user's mail ID.
By mistake they can enter wrong mail IDs due to typo.
At times they can forget their password and if the mail id is not verified then they would not be able to retrieve their account

Deliverables

Show a verify Email id button on the user's screen once the user has succefully logged in and entered into the platform.
when the user clicks on it ,send a mail on the users email ID with a One Time verificcation link using firebase - https://firebase.google.com/docs/reference/rest/auth#section-send-email-verification
Check your email , you might have recieved a verification link . Click on it to verify.
Handle all the possible errors that could come , which are mentioned in the docs

Made verify email working successfully through Profile.jsx file.
