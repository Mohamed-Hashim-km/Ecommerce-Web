import { createSlice } from "@reduxjs/toolkit";

const initialState = { userInfo: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearCredentials: (state, action) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const authSliceReducer = authSlice.reducer;
export const { setCredentials, clearCredentials } = authSlice.actions;
