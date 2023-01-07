import projectRepository from "../repositories/projects-repository.js";

export default {
  async getAllProjects() {
    let projects = await projectRepository.getAllProjects();
    return projects.rows.length ? projects.rows : [];
  },
  async getProjectById(projectId) {
    let projects = await projectRepository.getProjectById(projectId);
    return projects.rows.length ? projects.rows : [];
  },
  async getProjectByOwner(ownerId) {
    let projects = await projectRepository.getProjectByOwner(ownerId);
    return projects.rows.length ? projects.rows : [];
  },
  async getAssignationsByProjectId(projectId) {
    let assignations = await projectRepository.getAssignationsByProjectId(
      projectId
    );
    return assignations.rows.length ? projects.rows : [];
  },
  async createProject(ownerId, ownerName, projectName) {
    let projects = await projectRepository.createProject(
      ownerId,
      ownerName,
      projectName
    );
    return projects.rows.length ? projects.rows[0] : [];
  },
  async assignToProject(projectId, employeeId, projectName, employeeName) {
    let projects = await projectRepository.assignToProject(
      projectId,
      employeeId,
      projectName,
      employeeName
    );
    return projects.rows.length ? projects.rows[0] : [];
  },
  async getProjectDetails(projectId, employeeId, projectName, employeeName) {
    return await projectRepository.getProjectDetails(
      projectId,
      employeeId,
      projectName,
      employeeName
    );
  },
};
