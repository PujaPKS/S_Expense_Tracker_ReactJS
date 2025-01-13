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
