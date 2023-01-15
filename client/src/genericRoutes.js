import Home from "./pages/Home";
import ManagePanel from "./pages/ManagePanel";
import Project from "./pages/Project";
import Task from "./pages/Task";

const genericRoutes = () => {
  return [
    {
      name: "Home",
      path: "/",
      component: Home,
      displayOnNav: true,
      exact: true,
    },
    {
      name: "Manage Panel",
      path: "/manage-panel",
      component: ManagePanel,
      displayOnNav: true,
      exact: true,
    },
    {
      name: "Project",
      path: "/project/:id",
      component: Project,
      exact: true,
    },
    {
      name: "Task",
      path: "/project/:id/task/:task_id",
      component: Task,
      exact: true,
    },
  ];
};

export default genericRoutes;
