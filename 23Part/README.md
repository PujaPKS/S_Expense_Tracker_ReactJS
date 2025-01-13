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

Link (https://drive.google.com/drive/folders/14FOq75asjvLoUfkDBhDxhzEcuIptfTrS)

Test Driven Development (TDD)

1. Watch video 1, 2, 3 and 4 from the following link and answer the following

   1. Why do we need automated tests?
   2. What are the 3 types of automated tests?Explain each one of them?
   3. What to test and how to test?

2. Watch video 5 , 6 , 7 and 8 from above link, code along with the udemy trainer and answer the following

   1. What does render function do?
   2. What does screen.getText exactly do.
   3. What does test suites exactly mean. How do we write them?

3. Deliverable ---(Do this in you Expense Tracker project)

   1. Install the testing library node modules into your expense tracker app which you previously created
   2. Write a total of 10 test cases in it.


Main changes in files --->
1. package.json
2. vite.config.js
3. setupTests.js
4. App.test.jsx
5. In __tests__ folder added files of testing to get total 10 test cases. but only 8 test cases are there
      1. App.test.jsx 
      2. Header.test.jsx
      3. SignUp.test.jsx

