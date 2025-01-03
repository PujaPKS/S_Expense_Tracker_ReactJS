import React, { useEffect, useState } from "react";
import "./Expenses.css";
import ExpenseForm from "./ExpenseForm";
import axios from "axios";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [expenseInput, setExpenseInput] = useState({
    price: "",
    expenseTitle: "",
    category: "Expenses Category",
  });

  // const [expenseInput, setExpenseInput] = useState({
  //   expense: "",
  //   desc: "",
  //   cat: "Expenses Category",
  // });
  
  const totalAmount = expenses.reduce((sum, expense) => sum + Number(expense.price), 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseInput((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    //adding expenses in Database
    try {
      const response = await axios.post(
        "https://expensetracker-8e391-default-rtdb.firebaseio.com/expenses.json",
        expenseInput
      );
      console.log("Document Added:", response);
    } catch (error) {
      console.error(
        "Error Adding Document:",
        error.response?.data || error.message
      );
    }

    // setExpenses((prev) => [...prev, expenseInput]);
    setExpenseInput({
      price: "",
      expenseTitle: "",
      category: "",
    });

    //fetching data from Database function
    fetchDataFromDb();

  // const handleFormSubmission = (e) => {
  //   e.preventDefault();

    // const newExpense = {
    //   id: expenseInput.id || Date.now(),
    //   ...expenseInput,
    // };

    // if (expenseInput.id) {
    //   setExpenses((prevExpenses) =>
    //     prevExpenses.map((expense) =>
    //       expense.id === expenseInput.id ? newExpense : expense
    //     )
    //   );
    // }
    // else {
    //   setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    // }

    // Reseted the form and hidden it
    // setExpenseInput({ expense: "", desc: "", cat: "Expenses Category" });
    setShowForm(false);
  };

  const handleEdit = (id) => {
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    setExpenseInput(expenseToEdit);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  const closeForm = () => {
    setExpenseInput({ expense: "", desc: "", cat: "Expenses Category" });
    setShowForm(false);
  };

  //Reading data from Database
  async function fetchDataFromDb() {
    const response = await axios.get(
      "https://expensetracker-8e391-default-rtdb.firebaseio.com/expenses.json"
    );

    // Transforming the data into an array of objects
    const expensesArray = Object.keys(response?.data || {}).map((key) => ({
      id: key, // Including the unique identifier key as 'id'
      ...response.data[key],
    }));

    setExpenses(expensesArray); // Updated the state with the array

    // console.log("response - ", response?.data);
  }

  useEffect(() => {
    fetchDataFromDb();
    console.log('useEffect');
    return () => {};
  }, []);

  // console.log("expense - ", expenses);

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
      <p className="amount">
        Total Amount: <strong>{totalAmount} Rs</strong>
      </p>

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
        {expenses && expenses.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses &&
                expenses.map((expense, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{expense?.price} Rs</td>
                    {/* Undefined handler controlled by "?" */}
                    <td>{expense?.expenseTitle}</td>
                    <td>{expense?.category}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleEdit(expense?.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(expense?.id)}
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