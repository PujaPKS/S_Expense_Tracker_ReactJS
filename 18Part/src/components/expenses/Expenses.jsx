import React, { useEffect, useState } from "react";
import "./Expenses.css";
import ExpenseForm from "./ExpenseForm";
import { useDispatch, useSelector } from "react-redux"; // it is for redux
import {
  createExpenseAsync,
  deleteExpenseAsync,
  getExpenseAsync,
  updateExpenseAsync,
} from "../../store/slice/ExpenseSlice"; // importing actions from ExpenseSlice

import { toggleDarkMode } from "../../store/slice/ThemeSlice"; // importing actions from ThemeSlice

import { CSVLink } from "react-csv"; // for csv import

const Expenses = () => {
  // Redux
  const dispatch = useDispatch();
  const expenseRedux = useSelector((state) => state.expenses);
  const themeRedux = useSelector((state) => state.theme.isDarkMode); // getting theme from Redux store

  // console.log("expenseRedux - ", expenseRedux?.data);

  const [showForm, setShowForm] = useState(false); // for expense form visibility

  const [expenseInput, setExpenseInput] = useState({
    price: "",
    expenseTitle: "",
    category: "",
  });

  // converting object to array for easier manipulation
  const expensesArray = Object.keys((expenseRedux && expenseRedux?.data) || {}).map(
    (key) => ({
    id: key, // Including the unique identifier key as 'id'
    ...expenseRedux.data[key],
  }));

  const totalAmount = expensesArray.reduce(
    (sum, expense) => sum + Number(expense.price),
    0
  );

  // for expenses form input change event handler
  const handleChange = (e) => { 
    const { name, value } = e.target;
    setExpenseInput((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handling form submission with async/await and also keeping track of id of expense for updating the expense
  const handleFormSubmission = async (e) => {
    e.preventDefault();

    // Condition for checking if expense id is present or not
    // If id is present, it means we are updating the expense
    if (expenseInput.id) {
      try {
        await dispatch(updateExpenseAsync({ expenseInput })); // updating expense
      } catch (error) {
        console.error("Error Updating Expense:", error);
      }
    } 
    // If id is not present, it means we are adding a new expense
    else {
      try {
        await dispatch(createExpenseAsync({ expenseInput }));
        await dispatch(getExpenseAsync()); // Fetching the expenses list
      } catch (error) {
        console.error("Error Adding Expense:", error);
      }
    }

    // Reset form and hide after submission
    setExpenseInput({
      price: "",
      expenseTitle: "",
      category: "Expenses Category",
    });
    setShowForm(false); // Hiding the form after submission
  };

  // handling edit button click event
  const handleEdit = (id) => {
    const expenseToEdit = expensesArray.find((expense) => expense?.id === id); // Finding the expense to edit from the expense array
    setExpenseInput(expenseToEdit); // Setting the expense input with the expense to edit data
    setShowForm(true); // Show form for editing
  };

  // handling delete button click event
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteExpenseAsync({ id })); // Deleting the expense
      await dispatch(getExpenseAsync()); // Refresh after deletion and getting the updated expenses list after delete
    } catch (error) {
      console.error("Error Deleting Expense:", error);
    }
  };

  // Handling close button click event
  const closeForm = () => {
    setExpenseInput({
      price: "",
      expenseTitle: "",
      category: "Expenses Category",
      id: "",
    });
    setShowForm(false);
  };

  // useEffect hook is used to fetch expenses list when the component mounts
  useEffect(() => {
    dispatch(getExpenseAsync());
  }, [dispatch]);

  // // Adding Dark mode theme reducer
  // const isDarkMode = themeRedux.isDarkMode; // Get the current dark mode state from Redux
  // const toggleDarkModeHandler = () => {
  //   dispatch(toggleDarkMode()); // Dispatch the toggleDarkMode action
  // };
   // handling theme toggle (dark mode)
   const toggleDarkModeHandler = () => {
    dispatch(toggleDarkMode()); // Dispatch the toggleDarkMode action
  };

   // Listen for the change in total amount and toggle dark mode if needed
  useEffect(() => {
      if (totalAmount < 10000 && themeRedux) {
        dispatch(toggleDarkMode());  // Turn off dark mode if totalAmount is below 10000
      }
  }, [totalAmount, themeRedux, dispatch]);

  // Effect to sync the body class with the theme state
  useEffect(() => {
    // Check if dark mode is enabled or disabled based on the Redux state
    if (themeRedux) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [themeRedux]);  // Only depend on the themeRedux.isDarkMode state


  //Defining header passed in CSVLink . key should have same value as in expensesArray data is inserted
  const header = [
    { label: "No.", key: "no." },
    { label: "Price", key: "price" },
    { label: "Category", key: "category" },
    { label: "Description", key: "expenseTitle" },
  ]


  return (
    <div className="expenses-container">
      <div className="summary">
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Expense Form" : "Add New Expense"}
        </button>
      </div>

      {/* Wrapped download buton in CSVLink */}
      {/* And this CSVLink we will pass the data from where we want to download */}
      <CSVLink data={expensesArray} headers={header} filename="expenseData">
        {/* Button for downloading expenses as CSV file */}
        <div >
          <button className="download">Download</button>
        </div>
      </CSVLink>
      
      <p className="amount">
        Total Amount: <strong>{totalAmount} Rs</strong>
      </p>

      {/* Conditional rendering if price is more than 10000 */}
      {/* Conditional Button */}
      {totalAmount > 100000 && (
        <div className="alert-btn">
          {/* <button className="darkMode">
            Alert: High Expense Total!
          </button> */}
          {/* Adding dark mode toggle */}
          <button className="darkmode" onClick={toggleDarkModeHandler}>
            Alert: High Expense Total! (Toggle {themeRedux.isDarkMode ? "Light" : "Dark"} Mode)
          </button>
        </div>
      )}

      {showForm && (
        <ExpenseForm
          expenseInput={expenseInput}
          handleChange={handleChange}
          handleFormSubmission={handleFormSubmission}
          closeForm={closeForm}
        />
      )}

      <h3 className="heading">Item Expenses</h3>
      <div className="expense-list">
        {expenseRedux.isLoading ? (
          <h4
            style={{
              padding: "15px",
              backgroundColor: "#000",
              color: "#FFF",
              textAlign: "center",
            }}
          >
            Please wait, data is loading from API
          </h4>
        ) : expensesArray.length ? (
          <table className="table">
            <thead>
              <tr>
                <th>S.No</th>
                {/* <th>id</th> */}
                <th>Amount</th>
                <th>Description</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expensesArray.map((expense, index) => (
                <tr key={expense.id}>
                  <td>{index + 1}</td>
                  {/* <td>{expense.id}</td> */}
                  <td>{expense.price} Rs</td>
                  <td>{expense.expenseTitle}</td>
                  <td>{expense.category}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(expense.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(expense.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="amount">No expenses added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Expenses;
