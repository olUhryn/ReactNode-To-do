import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  currentProject: {},
  tasks: [],
  currentTask: null,
  comments: [],
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
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const {
  setProjects,
  setCurrentProject,
  setTasks,
  setCurrentTask,
  setComments,
} = counterSlice.actions;

export default counterSlice.reducer;
