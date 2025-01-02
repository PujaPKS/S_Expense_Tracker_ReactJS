import React, { useState } from "react";
import "./Expenses.css";
import ExpenseForm from "./ExpenseForm";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [expenseInput, setExpenseInput] = useState({
    expense: "",
    desc: "",
    cat: "Expenses Category",
  });

  const totalAmount = expenses.reduce((sum, expense) => sum + Number(expense.expense), 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseInput((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();

    const newExpense = {
      id: expenseInput.id || Date.now(),
      ...expenseInput,
    };

    if (expenseInput.id) {
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === expenseInput.id ? newExpense : expense
        )
      );
    } 
    else {
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    }

    // Reseted the form and hidden it
    setExpenseInput({ expense: "", desc: "", cat: "Expenses Category" });
    setShowForm(false);
  };

  const handleEdit = (id) => {
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    setExpenseInput(expenseToEdit);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  };

  const closeForm = () => {
    setExpenseInput({ expense: "", desc: "", cat: "Expenses Category" });
    setShowForm(false);
  };

  return (
    <div className="expenses-container">
      <div className="summary">
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
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
        {expenses.length > 0 ? (
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
              {expenses.map((expense, index) => (
                <tr key={expense.id}>
                  <td>{index + 1}</td>
                  <td>{expense.expense} Rs</td>
                  <td>{expense.desc}</td>
                  <td>{expense.cat}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => handleEdit(expense.id)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(expense.id)}>
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
