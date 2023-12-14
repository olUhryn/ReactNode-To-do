import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Users", // Will use table name `post` as default behaviour.
  tableName: "users", // Optional: Provide `tableName` property to override the default behaviour for table name.
  columns: {
    user_id: {
      primary: true,
      type: "int",
      generated: true,
    },
    user_name: {
      type: "varchar",
    },
    user_email: {
      type: "varchar",
    },
    user_password: {
      type: "varchar",
    },
    user_role: {
      type: "varchar",
      nullable: true,
    },
  },
  relations: {
    projects: {
      target: "Projects",
      type: "one-to-many",
      joinTable: true,
      cascade: true,
    },
    projects_assignations: {
      target: "ProjectAssignations",
      type: "one-to-many",
      joinTable: true,
      cascade: true,
    },
    tasks: {
      target: "Tasks",
      type: "one-to-many",
      joinTable: true,
      cascade: true,
    },
    comments: {
      target: "Comments",
      type: "one-to-many",
      joinTable: true,
      cascade: true,
    },
  },
});
