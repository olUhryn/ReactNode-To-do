import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Comments", // Will use table name `post` as default behaviour.
  tableName: "comments", // Optional: Provide `tableName` property to override the default behaviour for table name.
  columns: {
    comment_id: {
      primary: true,
      type: "int",
      generated: true,
    },
    task_id: {
      type: "int",
    },
    owner_id: {
      type: "int",
    },
    comment_description: {
      type: "varchar",
    },
    creation_date: {
      type: "timestamptz",
      default: "NOW()",
    },
  },
});
