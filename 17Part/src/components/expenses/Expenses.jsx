// import React, { useEffect, useState } from "react";
// import "./Expenses.css";
// import ExpenseForm from "./ExpenseForm";
// import axios from "axios";

// const Expenses = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [expenseInput, setExpenseInput] = useState({
//     price: "",
//     expenseTitle: "",
//     category: "Expenses Category",
//   });
  
//   const totalAmount = expenses.reduce((sum, expense) => sum + Number(expense.price), 0);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setExpenseInput((prevState) => ({ ...prevState, [name]: value }));
//   };
  

//   // Handling form submission with async/await and also keeping track of id of expense for updating the expense
//   const handleFormSubmission = async (e) => {
//     e.preventDefault();
  
//     // Condition for checking on click of button is it for adding expense or updating expense
//     // Condition to check if expense id is present or not
//     if (expenseInput.id) {
//       // Editing existing expense if expenseInput.id is present (remove old data in id and add updated data in id)
//       try {
//         // Updated expense in Firebase database using put method
//         await axios.put(
//           `https://expensetracker-8e391-default-rtdb.firebaseio.com/expenses/${expenseInput.id}.json`,
//           expenseInput
//         );
  
//         // Updated the local state by replacing the old expense with the updated one
//         setExpenses((prevExpenses) =>
//           prevExpenses.map((expense) =>
//             expense.id === expenseInput.id ? { ...expense, ...expenseInput } : expense
//           )
//         );
//         console.log("Expense updated successfully");
//       } 
//       catch (error) {
//         console.error("Error Updating Expense:", error);
//       }
//     } 
//     else { // Adding new expense if expenseInput.id is not present
//       // Adding a new expense (if no id is in expenseInput)
//       try {
//         // Adding new expense in Firebase database using post method
//         const response = await axios.post(
//           "https://expensetracker-8e391-default-rtdb.firebaseio.com/expenses.json",
//           expenseInput
//         );
  
//         // Adding the new expense to the local state
//         setExpenses((prevExpenses) => [
//           ...prevExpenses,
//           { id: response.data.name, ...expenseInput },
//         ]);
//         console.log("New expense added successfully");
//       } 
//       catch (error) {
//         console.error("Error Adding Expense:", error);
//       }
//     }
  
//     // Reseting the form after submission
//     setExpenseInput({
//       price: "",
//       expenseTitle: "",
//       category: "Expenses Category",
//     });
//     setShowForm(false); // Hiding the form after submission
//   };

//   const handleEdit = (id) => {
//     const expenseToEdit = expenses.find((expense) => expense.id === id);
//     setExpenseInput(expenseToEdit); // Setting the form state to the existing expense data
//     setShowForm(true); // Showed the form to edit the expense
//   };

//   // Function for handling delete from Database
//   const handleDelete = async (id) => {
//     try {
//       // Deleted the expense from Firebase Realtime Database using the correct ID and delete method
//       await axios.delete(
//         `https://expensetracker-8e391-default-rtdb.firebaseio.com/expenses/${id}.json`
//       );
      
//       // Now, removing the deleted expense from the local state by filtering out that specific ID
//       setExpenses((prevExpenses) =>
//         prevExpenses.filter((expense) => expense.id !== id) // Filtered by matching the id in local state
//       );
//       console.log("Expense deleted successfully");
//     } 
//     catch (error) {
//       console.error("Error Deleting Expense:", error);
//     }
//   };

//   const closeForm = () => {
//     setExpenseInput({ 
//       price: "", 
//       expenseTitle: "", 
//       category: "Expenses Category", 
//       id: "" 
//     }); // Resetting the form state
//     setShowForm(false);
//   };

//   // Reading data from Database
//   async function fetchDataFromDb() {
//     // Fetching data from Firebase Realtime Database using get method
//     const response = await axios.get(
//       "https://expensetracker-8e391-default-rtdb.firebaseio.com/expenses.json"
//     );

//     // Transforming the data into an array of objects
//     const expensesArray = Object.keys(response?.data || {}).map((key) => ({
//       id: key, // Including the unique identifier key as 'id'
//       ...response.data[key],
//     }));

//     setExpenses(expensesArray); // Updated the state with the array

//     // console.log("response - ", response?.data);
//   }

//   useEffect(() => {
//     fetchDataFromDb();
//     console.log('useEffect');
//     return () => {};
//   }, []);

//   // console.log("expense - ", expenses);

//   return (
//     <div className="expenses-container">
//       <div className="summary">
//         <button
//           className="btn btn-primary"
//           onClick={() => setShowForm(!showForm)}
//         >
//           {showForm ? "Close Expense Form" : "Add New Expense"}
//         </button>
//       </div>
//       <p className="amount">
//         Total Amount: <strong>{totalAmount} Rs</strong>
//       </p>

//       {/* Conditional rendering if price is more than 10000 */}
//       {/* Conditional Button */}
//       {totalAmount > 100000 && (
//         <div className="alert-btn">
//           <button className="darkMode">
//             Alert: High Expense Total!
//           </button>
//         </div>
//       )}

//       {showForm && (
//         <ExpenseForm
//           expenseInput={expenseInput}
//           handleChange={handleChange}
//           handleFormSubmission={handleFormSubmission}
//           closeForm={closeForm}
//         />
//       )}

//       <h3 className="heading">Item Expenses</h3>
//       <div className="expense-list">
//         {expenses && expenses.length > 0 ? (
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>Amount</th>
//                 <th>Description</th>
//                 <th>Category</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {expenses &&
//                 expenses.map((expense, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{expense?.price} Rs</td>
//                     {/* Undefined handler controlled by "?" */}
//                     <td>{expense?.expenseTitle}</td>
//                     <td>{expense?.category}</td>
//                     <td>
//                       <button
//                         className="btn btn-warning"
//                         onClick={() => handleEdit(expense?.id)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="btn btn-danger"
//                         onClick={() => handleDelete(expense?.id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="amount">No expenses added yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Expenses;







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

const Expenses = () => {
  // Redux
  const dispatch = useDispatch();
  const expenseRedux = useSelector((state) => state.expenses);

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

      {/* Conditional rendering if price is more than 10000 */}
      {/* Conditional Button */}
      {totalAmount > 100000 && (
        <div className="alert-btn">
          <button className="darkMode">
            Alert: High Expense Total!
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
