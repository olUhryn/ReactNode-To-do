import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import projectsRouter from "./routes/projects.js";

export const routes = [
  { name: "/api/users", router: usersRouter },
  { name: "/api/auth", router: authRouter },
  { name: "/api/projects", router: projectsRouter },
];

const routesInit = (app) => {
  routes.forEach(({ name, router }) => {
    app.use(name, router);
  });

  app.get("*", (req, res) => {
    res.sendFile(join(__dirname, "../../client/build", "index.html"));
  });
};

export default routesInit;
