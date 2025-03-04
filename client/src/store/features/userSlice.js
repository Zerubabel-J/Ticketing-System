import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to handle login request
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Action to handle login success
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user; // User data from the API
      state.token = action.payload.token; // Token from the API
    },
    // Action to handle login failure
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Error message from the API
    },
    // Action to handle logout
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    setAuthState: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

// Export the actions
export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  setAuthState,
} = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
