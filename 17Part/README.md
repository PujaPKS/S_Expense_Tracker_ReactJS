For installing redux and redux toolkit ----> npm install @reduxjs/toolkit react-redux

Link (https://drive.google.com/drive/folders/1ZHDbeZ4a14YvfBW11-W99Oc_zt46r67u)

Doing the Expense Tracker the right way

1. Watch video 23 from the following link and answer the following.

   1. Why are we splitting the file?
   2. What is the logic behind diving the files like the way the udemy trainer does?



2. Watch video 24 from above link and answer the following.

    1. Explain the core concepts of redux?
    2. Tell the utilities of following
    3. useDispatch
    4. combineReducers
    5. useSelector
    6. When to use redux and when to use context API?

3. Deliverables

    1. The Expense tracker is going to be a big app now. So managing it like the way we did previously ,is not right approach.
    2. Add the following reducers to the Expense Tracker app and make it work via reducers
    3. Auth Reducer - The users logged in status and bearer tokens, user ID should be saved here. Use this bearer token whenever you are calling the apis that need it/
    4. Expenses reducers - All the expense entered by the user and fetched from the backend should be save in the reducer.
    5. If the expenses go above 10000 rupees show an activate Premium Button.





Main changes in files --->
1. main.jsx 
2. Store.jsx file made
3. ExpenseSlice.jsx made
4. Expenses.jsx removed unnenecessary commented code and added an alert button if price goes above 10,000
5. AuthSlice.jsx made . So now due to this the use of AuthProvider.jsx and AuthContext.js file will be removed.
6. Expenses.jsx file modified to use the new ExpenseSlice.jsx
7. SignUp.jsx file modified to use the new AuthSlice.jsx (will do in next part)

