import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Projects", // Will use table name `post` as default behaviour.
  tableName: "projects", // Optional: Provide `tableName` property to override the default behaviour for table name.
  columns: {
    project_id: {
      primary: true,
      type: "int",
      generated: true,
    },
    owner_id: {
      type: "int",
    },
    project_name: {
      type: "varchar",
    },
    owner_name: {
      type: "varchar",
    },
    creation_date: {
      type: "timestamptz",
      default: "NOW()",
    },
  },
  relations: {
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
  },
});
