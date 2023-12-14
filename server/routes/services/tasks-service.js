import tasksRepository from "../repositories/tasks-repository.js";

export default {
  async createTask(taskName, ownerId, projectId) {
    return await tasksRepository.createTask(taskName, ownerId, projectId);
  },
  async getTasks(projectId) {
    return await tasksRepository.getTasks(projectId);
  },
  async getTask(taskId) {
    return await tasksRepository.getTask(taskId);
  },
  async updateTask(taskId, taskDescription, taskStatus, assignedUser) {
    return await tasksRepository.updateTask(
      taskId,
      taskDescription,
      taskStatus,
      assignedUser
    );
  },
  async deleteTask(taskId) {
    return await tasksRepository.deleteTask(taskId);
  },
  async createComment(taskId, commentDescription, ownerId) {
    return await tasksRepository.createComment(
      taskId,
      commentDescription,
      ownerId
    );
  },
  async getComments(taskId) {
    return await tasksRepository.getComments(taskId);
  },
  
};
