import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  userPass: localStorage.getItem("userPass")
    ? JSON.parse(localStorage.getItem("userPass"))
    : null,
  currentUser:null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userInformaton: (state, action) => {
      state.userInfo = action.payload;
    },
    getPass: (state, action) => {
      state.userPass = action.payload;
    },
    getCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userInformaton, getPass, getCurrentUser } = usersSlice.actions;

export default usersSlice.reducer;
