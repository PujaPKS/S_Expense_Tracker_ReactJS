// import React from 'react';
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const HOSTNAME = "https://expensetracker-8e391-default-rtdb.firebaseio.com/expenses.json";

// const initialState = {
//     expenses: {}, // expenses geting in firebase is an object so store all expenses as it is 
//     isLoading: false,
//     isError: false,
//     // isError: null
// };

// //Exporting Thunks
// // Creating Expenses
// export const createExpenses = createAsyncThunk(
//     "createExpenses", // name of the action
//     async ({ expenseInput }) => {
//         try {
//             const response = await axios.post(HOSTNAME, expenseInput);
//             // console.log('response--', response);
//             return response.data;
//         }
//         catch (error) {
//             console.log(' Error while creating expense:', error);
//         }
//     }
// );

// // Fetching Expenses
// export const fetchExpenses = createAsyncThunk(
//     "fetchExpenses", // name of the action
//     async () => {
//         try {
//             const response = await axios.get(HOSTNAME);
//             // console.log('response--', response);
//             return response.data;
//         }
//         catch(error){
//             console.log('Error while fetching expenses:', error);
//         }
//     }
// );

// // Updating Expenses
// export const updateExpenses = createAsyncThunk(
//     "updateExpenses", // name of the action
//     async ({ expenseInput }) => {
//         try {
//             const response = await axios.put(
//                 `https://expensetracker-8e391-default-rtdb.firebaseio.com/${expenseInput.id}.json`, 
//                 expenseInput
//             );
//             // console.log('response--', response);
//             // return response.data;
//             return { id: expenseInput.id, data: response.data };
//         }
//         catch (error) {
//             console.log(' Error while updating expense:', error);
//         }
//     }
// );

// // Deleting Expenses
// export const deleteExpenses = createAsyncThunk(
//     "deleteExpenses", // name of the action
//     async ({ expenseId }) => {
//         try {
//             const response = await axios.delete(
//                 `https://expensetracker-8e391-default-rtdb.firebaseio.com/${expenseId}.json`
//             );
//             // console.log('response--', response);
//             return expenseId;
//             // // return { id: expenseId, data: expenseInput };
//         }
//         catch (error) {
//             console.log(' Error while deleting expense:', error);
//         }
//     }
// )

// // exporting createSlice
// export const ExpenseSlice = createSlice({
//     name: 'tasks',  // this name is shown when we use redux toolkit in chrome extension
//     initialState,  // each slice has its initialState. We declared the values in initialState seperately
//     // reducers store properties and functions
//     reducers: {}, // reducers store properties and functions

//     // For handling async logic in Redux we use Redux middleware like Redux Thunk or Redux Saga
//     // Redux Thunk is a middleware that lets you write action creators that return a function instead of an action
//     extraReducers: (builder) => {
//         builder

//         // Creating expenses
//         .addCase(createExpenses.pending, (state) => {
//             state.isLoading = true;
//         })
//         .addCase(createExpenses.fulfilled, (state, action) => {
//             state.isLoading = false;  // loading set to false
//             // state.expenses = [...state.expenses, action.payload]; // adding new expense to the state
//         })
//         .addCase(createExpenses.rejected, (state, action) => {
//             state.isLoading = false;  // loading set to false
//             state.isError = true; // adding error message to the state
//         })

//         // Fetching Expenses
//         .addCase(fetchExpenses.pending, (state) => {
//             state.isLoading = true;
//         })
//         .addCase(fetchExpenses.fulfilled, (state, action) => {
//             state.isLoading = false;  // loading set to false
//             // console.log("action get", action.payload);
//             state.expenses = action.payload; // assigning fetched expenses to the state
//         })
//         .addCase(fetchExpenses.rejected, (state, action) => {
//             state.isLoading = false;  // loading set to false
//             state.isError = true; // adding error message to the state
//         })

//         // Updating Expense
//         .addCase(updateExpenses.pending, (state) => {
//             state.isLoading = true;
//         })
//         .addCase(updateExpenses.fulfilled, (state, action) => {
//             console.log("Update Expense Payload:", action.payload);
//             state.isLoading = false;  // loading set to false
//             const { id, data } = action.payload;
//             if (id && state.expenses[id]) {
//                 state.expenses[id] = data;
//             }
//         })
//         .addCase(updateExpenses.rejected, (state, action) => {
//             state.isLoading = false;  // loading set to false
//             state.isError = true; // adding error message to the state
//         })

//         // Deleting Expense
//         .addCase(deleteExpenses.pending, (state) => {
//             state.isLoading = true; // loading set to true
//         })
//         .addCase(deleteExpenses.fulfilled, (state, action) => {
//             state.isLoading = false;  // loading set to false
        
//             const id = action.payload;
//             if (id && state.expenses[id]) {
//                 delete state.expenses[id];
//             }
//         })
//         .addCase(deleteExpenses.rejected, (state, action) => {
//             state.isLoading = false;  // loading set to false
//             state.isError = true; // adding error message to the state
//         });
//     }    

// });
// export default ExpenseSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME =
  "https://expensetracker-8e391-default-rtdb.firebaseio.com/expenses.json";

// const adminToken = localStorage.getItem("adminLoggedToken");

export const createExpenseAsync = createAsyncThunk(
  "createExpense",
  async ({ expenseInput }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}`,
        expenseInput
      );
      return response.data;
    } catch (error) {
      console.log("createExpenseAsync Error - ", error);
    }
  }
);

export const getExpenseAsync = createAsyncThunk("getExpense", async () => {
  try {
    const response = await axios.get(`${HOSTNAME}`);
    return response.data;
  } catch (error) {
    console.log("getExpenseAsync Error - ", error.response);
  }
});

export const updateExpenseAsync = createAsyncThunk(
  "updateExpense",
  async ({ expenseInput }) => {
    try {
      const response = await axios.put(
        `https://expensetracker-8e391-default-rtdb.firebaseio.com/expenses/${expenseInput.id}.json`,
        {
          ...expenseInput,
        }
      );
      return response.data;
    } catch (error) {
      console.log("updateExpenseAsync Error - ", error.response);
    }
  }
);

export const deleteExpenseAsync = createAsyncThunk(
  "deleteExpense",
  async ({ id }) => {
    try {
      const response = await axios.delete(
        `https://expensetracker-8e391-default-rtdb.firebaseio.com/expenses/${id}.json`
      );
      return response.data;
    } catch (error) {
      console.log("deleteExpenseAsync Error - ", error.response);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const ExpenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createExpenseAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createExpenseAsync.fulfilled, (state, action) => {
        state.isLoading = false;
      })

      .addCase(createExpenseAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getExpenseAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getExpenseAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getExpenseAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      // update
      .addCase(updateExpenseAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateExpenseAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        const { id } = action.meta.arg.expenseInput;

        if (state.data && state.data.hasOwnProperty(id)) {
          const { category, expenseTitle, price } = action.meta.arg.expenseInput;
          state.data[id].category = category;
          state.data[id].expenseTitle = expenseTitle;
          state.data[id].price = price;
          console.log(
            `updated property with id:`,
            category,
            expenseTitle,
            price
          );
        } else {
          console.log(`No property found with id: ${id}`);
        }
      })

      .addCase(updateExpenseAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteExpenseAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteExpenseAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        const { id } = action.meta.arg;

        if (state.data && state.data.hasOwnProperty(id)) {
          delete state.data[id];
          console.log(`Deleted property with id: ${id}`);
        } else {
          console.log(`No property found with id: ${id}`);
        }
      })

      .addCase(deleteExpenseAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default ExpenseSlice.reducer;
