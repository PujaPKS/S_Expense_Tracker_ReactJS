Adding Expenses for tracking purpose

Add the feature of adding the "daily expenses" on the website.

Deliverable:

1) Make the frontend for the user for entering the following in a form having 3 input elements

the money he had spent
the description of the expense done.
the category.(This should be a dropdown) (e.g. Food, Petrol, salary etc.)

2) Make this frontend visible only after successful login.

3) Show the expenses that the user has added , below the form itself.

4) You dont have to integrate it with backend as a part of this task. In the next task you will see how to do it.


Reference mobile app: https://play.google.com/store/apps/details?id=com.seshadri.padmaja.expense


Main changes for adding Expense Tracker is made in --->
1. Expenses.jsx file is created for maintaining the expense tracker
2. Expenses.css file is created for styling the expense tracker
3. ExpenseForm.jsx file is created for expense form
4. ExpenseForm.css file is created for styling expense form
5. In App.jsx code connected expenses to route 
6. In AuthProvider.jsx code we stored the logged in user data in local storage so that on refresh it doesn't get lost
7. In MainNavigation.jsx we added code for logout that after user is logged out it should navigate to login page.
8. In App.jsx code we also added code for checking if user is logged in or not and if not then it should navigate to login page only not any other page on directly writing urls.