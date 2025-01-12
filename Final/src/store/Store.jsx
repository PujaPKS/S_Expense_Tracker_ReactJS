import { configureStore } from "@reduxjs/toolkit";

import ExpenseReducer from './slice/ExpenseSlice';
import AuthReducer from './slice/AuthSlice';

export const Store = configureStore({  //In configureStore we pass slice 
  reducer: {
    expenses: ExpenseReducer, // this(expenses) name of this slice can be used anywhere wherever needed.
    auth: AuthReducer // auth is another slice
  },
});
