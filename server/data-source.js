import dotenv from "dotenv";
dotenv.config();

import typeorm from "typeorm";
import Users from "./entity/Users.js";
import Projects from "./entity/Projects.js";
import ProjectAssignations from "./entity/ProjectAssignations.js";
import Tasks from "./entity/Tasks.js";
import Comments from "./entity/Comments.js";

let dataSource = new typeorm.DataSource({
  type: "postgres",
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE_NAME,
  entities: [Users, Projects, ProjectAssignations, Tasks, Comments],
  synchronize: true,
});

export default dataSource;
