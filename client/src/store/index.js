import { configureStore } from "@reduxjs/toolkit";
import users from "./modules/users";
import projects from "./modules/projects";

export const store = configureStore({
  reducer: { users, projects },
});
