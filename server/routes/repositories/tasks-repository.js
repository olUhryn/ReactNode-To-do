import dataSource from "../../data-source.js";
let Tasks = dataSource.getRepository("Tasks");
let Comments = dataSource.getRepository("Comments");
let Users = dataSource.getRepository("Users");

export default {
  async createTask(taskName, ownerId, projectId) {
    return Tasks.save({
      owner_id: ownerId,
      task_name: taskName,
      project_id: projectId,
      task_status: "To Do",
    });
  },
  async getTasks(projectId) {
    let tasks = await Tasks.findBy({
      project_id: projectId,
    });

    let users = await Users.createQueryBuilder("user")
      .where("user.user_id IN (:...ids)", {
        ids: tasks.map((task) => task.assigned_user_id),
      })
      .getMany();

    tasks = tasks.map((task) => {
      return {
        ...task,
        user_name: users.find((user) => user.user_id === task.assigned_user_id)
          ?.user_name,
      };
    });
    return tasks;
  },
  async getTask(taskId) {
    return Tasks.findOneBy({
      task_id: taskId,
    });
  },
  async updateTask(taskId, taskDescription, taskStatus, assignedUser) {
    let task = await Tasks.findOneBy({
      task_id: taskId,
    });
    task.task_status = taskStatus ? taskStatus : task.task_status;
    task.task_description = taskDescription
      ? taskDescription
      : task.task_description;
    task.assigned_user_id = assignedUser ? assignedUser : task.assigned_user_id;

    return await Tasks.save(task);
  },

  async deleteTask(taskId) {
    return Tasks.delete({
      task_id: taskId,
    });
  },
  async createComment(taskId, commentDescription, ownerId) {
    return Comments.save({
      owner_id: ownerId,
      comment_description: commentDescription,
      task_id: taskId,
    });
  },
  async getComments(taskId) {
    let comments = await Comments.findBy({
      task_id: taskId,
    });

    let users = await Users.createQueryBuilder("user")
      .where("user.user_id IN (:...ids)", {
        ids: comments.map((comment) => comment.owner_id),
      })
      .getMany();

    comments = comments.map((comment) => {
      return {
        ...comment,
        user_name: users.find((user) => user.user_id === comment.owner_id)
          .user_name,
      };
    });
    return comments;
  },
};
