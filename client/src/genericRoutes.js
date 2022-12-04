import Home from "./pages/Home";

const genericRoutes = () => {
  return [
    {
      name: "Home",
      path: "/",
      component: Home,
      displayOnNav: true,
      exact: true,
    },
  ];
};

export default genericRoutes;
