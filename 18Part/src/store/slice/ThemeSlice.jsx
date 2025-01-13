// import { createSlice } from "@reduxjs/toolkit";

// export const ThemeSlice = createSlice({
//     name: "theme",
//     initialState: {
//         isDarkMode: false, // default theme is light
//     },
//     reducers: {
//         toggleTheme(state) {
//             state.isDarkMode = !state.isDarkMode; // toggle the theme between light and dark
//         },
//     },
// });

// export const { toggleDarkMode } = ThemeSlice.actions; // exporting the action creator for the toggleTheme reducer
// export default ThemeSlice.reducer; // exporting the reducer for the theme slice


// In ThemeSlice.js, update the reducer for dark mode
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false,  // default is false, light mode
};

const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleDarkMode } = ThemeSlice.actions;
export default ThemeSlice.reducer;
