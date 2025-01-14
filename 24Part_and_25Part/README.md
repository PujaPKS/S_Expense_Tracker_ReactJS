Intalling all libraries for testing . Command ---> npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event c8 msw

Installing jsdom command ---> npm install --save-dev jsdom

Packages Overview

  1. vitest: A fast and lightweight test runner for Vite.
  2. @testing-library/react: Tools for testing React components in a user-centric way.
  3. @testing-library/jest-dom: Custom matchers to extend Jest, e.g., toBeInTheDocument().
  4. @testing-library/user-event: Simulates user interactions like clicks and typing.
  5. c8: Provides test coverage reports.
  6. msw: (Optional) for Mock Service Worker for mocking API requests.

After Installation

   1. Configure vite.config.js: Add test settings for Vitest. Refer coding in file "vite.config.js".
   2. Create a setupTests.js file: Import @testing-library/jest-dom to extend Jest matchers. Refer coding in file "setupTests.js".
   3. For checking testing for a particular file make its file ----> "nameOfFileToCheck.test.jsx". Refer coding in file "App.test.jsx" where we are testing App component.
   4. Add a script in package.json to run tests. Refer coding in file "package.json". the scrip tag code for testing is below ---> "scripts": { "test": "vitest", "test:coverage": "vitest run --coverage" }
   5. Run the test command in terminal by using command ---> npm run test
   6. Save the files after making changes to see testing output change if error is there in code.



24 and 25 together task testing done

Link (https://drive.google.com/drive/folders/14FOq75asjvLoUfkDBhDxhzEcuIptfTrS)

24Part---> Testing User Actions

Watch video 9 and 10 from the following link

Deliverable

1. Add 10 test cases in your expense tracker project


Link (https://drive.google.com/drive/folders/14FOq75asjvLoUfkDBhDxhzEcuIptfTrS)
25Part ---> TDD Async code

1. Watch video 11 from the following link and answer the following [also code along with the trainer]

   1. What is the difference between findbyText and getbyText?
   2. Why do we have to put await before findbyText?
   3. What is the default timeout for findbyText? What does this timeout exactly mean ?

2. Watch video 12 and 13 and answer the following [also code along with the trainer]

   1. What is the need of mocking Apis?
   2. Why shouldnt we directly call APis?

3. Deliverables

   1. Write 10 more test cases in your Expense tracker.
   2. Make sure you mock all the necessary api calls and work accordingly


Main changes in files --->
1. Made changes in Expenses.jsx file there in Table added role so that it can be tested
1. Moved __tests__ folder outside of src folder.
2. In __tests__ folder added files of testing to get total 10 test cases.
      1. App.test.jsx changed path of imported files .
      2. Header.test.jsx changed path of imported files .
      3. SignUp.test.jsx changed path of imported files .
      4. Expenses.test.jsx added here the mock api calls are tested

