import Home from "./pages/Home";
import ManagePanel from "./pages/ManagePanel";
import Project from "./pages/Project";

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
  ];
};

export default genericRoutes;
