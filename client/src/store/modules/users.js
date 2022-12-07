import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  userData: null,
  projectAvailableUsers: [],
  projectAssignedUsers: [],
};

export const counterSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setProjectAvailableUsers: (state, action) => {
      state.projectAvailableUsers = action.payload;
    },
    setProjectAssignedUsers: (state, action) => {
      state.projectAssignedUsers = action.payload;
    },
  },
});

export const {
  setUserData,
  setProjectAvailableUsers,
  setProjectAssignedUsers,
} = counterSlice.actions;

export default counterSlice.reducer;
