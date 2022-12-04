import Home from "./pages/Home";
import ManagePanel from "./pages/ManagePanel";

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
  ];
};

export default genericRoutes;
