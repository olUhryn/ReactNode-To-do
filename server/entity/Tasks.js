import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Tasks", // Will use table name `post` as default behaviour.
  tableName: "tasks", // Optional: Provide `tableName` property to override the default behaviour for table name.
  columns: {
    task_id: {
      primary: true,
      type: "int",
      generated: true,
    },
    project_id: {
      type: "int",
    },
    task_name: {
      type: "varchar",
    },
    owner_id: {
      type: "int",
    },
    task_description: {
      type: "varchar",
      nullable: true,
    },
    task_status: {
      type: "varchar",
    },
    creation_date: {
      type: "timestamptz",
      default: "NOW()",
    },
    assigned_user_id: {
      type: "int",
      nullable: true,
    },
  },
  relations: {
    comments: {
      target: "Comments",
      type: "one-to-many",
      joinTable: true,
      cascade: true,
    },
  },
});
