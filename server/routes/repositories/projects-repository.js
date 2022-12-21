import pool from "../../db.js";

export default {
  async getAllProjects() {
    return await pool.query("SELECT * FROM projects");
  },
  async getProjectById(projectId) {
    return await pool.query("SELECT * FROM projects WHERE project_id = $1", [
      projectId,
    ]);
  },
  async getProjectByOwner(ownerId) {
    return await pool.query("SELECT * FROM projects WHERE owner_id = $1", [
      ownerId,
    ]);
  },
  async getAssignationsByProjectId(projectId) {
    return await pool.query(
      "SELECT * FROM projects_assignations WHERE project_id = $1",
      [projectId]
    );
  },
  async createProject(ownerId, ownerName, projectName) {
    return await pool.query(
      "INSERT INTO projects (owner_id, owner_name, project_name) VALUES ($1,$2,$3) RETURNING *",
      [ownerId, ownerName, projectName]
    );
  },
  async assignToProject(projectId, employeeId, projectName, employeeName) {
    return await pool.query(
      "INSERT INTO projects_assignations (project_id, employee_id, project_name, employee_name) VALUES ($1,$2,$3, $4) RETURNING *",
      [projectId, employeeId, projectName, employeeName]
    );
  },
  async getProjectDetails(projectId, employeeId, projectName, employeeName) {
    // TODO: details
    return await pool.query(
      "SELECT * FROM",
      [projectId, employeeId, projectName, employeeName]
    );
  },
};
