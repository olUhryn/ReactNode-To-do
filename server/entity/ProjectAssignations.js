import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "ProjectAssignations", // Will use table name `post` as default behaviour.
  tableName: "projects_assignations", // Optional: Provide `tableName` property to override the default behaviour for table name.
  columns: {
    assignation_id: {
      primary: true,
      type: "int",
      generated: true,
    },
    project_id: {
      type: "int",
    },
    user_id: {
      type: "int",
    },
  },
});
