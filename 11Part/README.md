Editing and Deleting Expenses

Problem

1. The user is not able to Edit / Delete any expense which he added.
2. If the user adds a wrong expense , he should be given the option to Edit the expense
3. If the user wants to delete an expense which he no longer wants to see, he should be able to delete that as well

Watch this video(https://www.youtube.com/watch?v=YKz3p6_YXdA) to understand how to Update and Delete Expenses


Deliverables

1. Add a Delete button next to the expense. When the user clicks on it, make a DELETE request and remove the expense from the database.
2. On successful deletion , console log ("Expense successfuly deleted")
3. Add a Edit button next to the expense. When the user clicks on the Edit button, the user should be able to edit all the expenses
4. Once he is done Editing and clicks on Submit , do a PUT request and update the values.


Main changes for Editing and Deleting Expenses in Firebase is made in --->
1. Expenses.jsx file is created to handle the expense form and list of expenses and to handle the delete and edit functionality. using post, put, delete methods of the fetch API.