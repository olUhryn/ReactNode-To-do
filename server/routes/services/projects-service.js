import projectRepository from "../repositories/projects-repository.js";

export default {
  async getAllProjects() {
    return await projectRepository.getAllProjects();
  },
  async getProjectById(projectId) {
    return await projectRepository.getProjectById(projectId);
  },
  async getProjectsById(projectId) {
    return await projectRepository.getProjectById(projectId);
  },
  async getProjectByOwner(ownerId) {
    return await projectRepository.getProjectByOwner(ownerId);
  },
  async getAssignationsByProjectId(projectId) {
    return await projectRepository.getAssignationsByProjectId(projectId);
  },
  async createProject(ownerId, ownerName, projectName) {
    return await projectRepository.createProject(
      ownerId,
      ownerName,
      projectName
    );
  },
  async assignToProject(projectId, userId) {
    return await projectRepository.assignToProject(projectId, userId);
  },
  async deleteAssignation(projectId, userId) {
    return await projectRepository.deleteAssignation(projectId, userId);
  },
  async getAvailablAssignationsByProjectId(projectId) {
    return await projectRepository.getAvailablAssignationsByProjectId(
      projectId
    );
  },
  async getProjectDetails(projectId, employeeId, projectName, employeeName) {
    return await projectRepository.getProjectDetails(
      projectId,
      employeeId,
      projectName,
      employeeName
    );
  },
  async deleteProject(projectId, ownerId) {
    return await projectRepository.deleteProject(projectId,ownerId);
  },
  async getProjectsByAssignationId(userId) {
    return await projectRepository.getProjectsByAssignationId(userId);
  },
};
