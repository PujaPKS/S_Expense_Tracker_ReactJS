Integrating it with firebase

Problem statement

1. Currently the main problem with the app is that no expense is being stored in any database
2. Once the user refreshes the page all the expenses are lost. That is really awful. Isn't it.
3. So lets connect our react app with firebase Backend Apis and firebase Realtime Database.

Lets configure the Database first.

1. Follow this doc/video(https://www.youtube.com/watch?v=5xlh3HazqD8) and configure the Firebase realtime database.

Understand how to do CRUD (Create, Read , Update and Delete) with firebase realtime database.

1. Watch this video(https://www.youtube.com/watch?v=Cj_flGeImCo) where I have explained how to do GET and POSt request


Deliverables
1. Whenever the user adds any expense store it in the database using the firebase apis and show it on the screen once you get a 200 Success from backend
2. Whenever the user refreshes the page do a GET request and get all the previously added expenses that were there.



Main changes for Integrating expenses with Firebase is made in --->
1. ExpenseForm.jsx file is created for maintaining the Input form structure 
2. Expenses.jsx file is created for integrating the form with firebase using POST request and Reading the data from firebase using GET request