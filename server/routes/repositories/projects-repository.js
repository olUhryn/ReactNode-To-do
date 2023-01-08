import dataSource from "../../data-source.js";
let Projects = dataSource.getRepository("Projects");
let ProjectAssignations = dataSource.getRepository("ProjectAssignations");
let Users = dataSource.getRepository("Users");

export default {
  async getAllProjects() {
    return await Projects.find();
  },
  async getProjectById(projectId) {
    return await Projects.findOneBy({
      project_id: projectId,
    });
  },
  async getProjectByOwner(ownerId) {
    return await Projects.findOneBy({
      owner_id: ownerId,
    });
  },
  async getAssignationsByProjectId(projectId) {
    let assignedUsers = await ProjectAssignations.findBy({
      project_id: projectId,
    });
    console.log(assignedUsers.map((assignation) => assignation.user_id));
    let users = await Users.createQueryBuilder("user")
      .where("user.user_id IN (:...ids)", {
        ids: assignedUsers.map((assignation) => assignation.user_id),
      })
      .getMany();
    console.log(users);
    return users;
  },
  async getAvailablAssignationsByProjectId(projectId) {
    let assignedUsers = await ProjectAssignations.findBy({
      project_id: projectId,
    });
    console.log(assignedUsers.map((assignation) => assignation.user_id));
    let users = await Users.createQueryBuilder("user")
      .where("user.user_id NOT IN (:...ids)", {
        ids: assignedUsers.map((assignation) => assignation.user_id),
      })
      .getMany();
    console.log(users);
    return users;
  },
  async createProject(ownerId, ownerName, projectName) {
    return await Projects.save({
      owner_id: ownerId,
      owner_name: ownerName,
      project_name: projectName,
    });
  },
  async deleteAssignation(projectId, userId) {
    await ProjectAssignations.delete({
      user_id: userId,
      project_id: projectId,
    });

    let assignedUsers = await ProjectAssignations.findBy({
      project_id: projectId,
    });

    console.log(assignedUsers.map((item) => [item.project_id, item.user_id]));
    let users = await Users.createQueryBuilder("user")
      .where("user.user_id NOT IN (:...ids)", {
        ids: assignedUsers.map((assignation) => assignation.user_id),
      })
      .getMany();
    return users;
  },
  async assignToProject(projectId, userId) {
    let projectAssignation = await ProjectAssignations.save({
      project_id: projectId,
      user_id: userId,
    });

    return await Users.findOneBy({
      user_id: projectAssignation.user_id,
    });
  },
  async getProjectDetails(projectId, employeeId, projectName, employeeName) {
    // TODO: details
    // return await pool.query("SELECT * FROM", [
    //   projectId,
    //   employeeId,
    //   projectName,
    //   employeeName,
    // ]);
  },
};
