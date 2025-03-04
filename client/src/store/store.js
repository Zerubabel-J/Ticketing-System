import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice"; // We'll create this next

const store = configureStore({
  reducer: {
    user: userReducer, // Add the user slice reducer
  },
});

export default store;
