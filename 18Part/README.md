For installing redux and redux toolkit ----> npm install @reduxjs/toolkit react-redux

Link (https://drive.google.com/drive/folders/1ZHDbeZ4a14YvfBW11-W99Oc_zt46r67u)

For CSV file handling ----> npm install react-csv


Adding Premium Features

1. When the user clicks on the "Activate Premium" after reaching Rs 10000 in expenses button, do the following

   1. Add a dark theme in your application.
   2. Put a toggle button to switch from light theme to dark theme (Hint - You have to use reducer - theme reducer)
   3. Add a download File button. When the user clicks on it, a file containing all his expenses gets downloaded as csv. [Check Hint 1 if stuck for quite long]

Hint 1:-->
https://www.youtube.com/watch?v=_HZdLuGL8Ho

1. Watch this video and understand how to download CSV.

2. Write the code without seeing.

3. Make sure you understand 2 things (Favourite Interview Question)

   1. What is a BLOB?
   2. What is createObjectUrl do?





Main changes in files --->
1. ThemeSlice.jsx reducer file made for dark mode theme
2. Store.jsx file updated to include theme reducer
3. Expenses.jsx file updated with dark mode toggle button
4. Expenses.css file updated with dark mode styles
5. Expenses.jsx file created a button to download csv file
6. Fixed header at top MainNavigation.css style added
7. gave margin to form in Expenses.css
8. gave margin to profile in Profile.css
9. gave margin to signup in Signup.css


10. CSV file is handled in Expenses.jsx file

