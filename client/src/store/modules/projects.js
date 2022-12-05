import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
};

export const counterSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
  },
});

export const { setProjects } = counterSlice.actions;

export default counterSlice.reducer;
