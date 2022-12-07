import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  currentProject: {}
};

export const counterSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
  },
});

export const { setProjects, setCurrentProject } = counterSlice.actions;

export default counterSlice.reducer;
