import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  userData: null,
};

export const counterSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = counterSlice.actions;

export default counterSlice.reducer;
