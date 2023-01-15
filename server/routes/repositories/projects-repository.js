import dataSource from "../../data-source.js";
let Projects = dataSource.getRepository("Projects");
let ProjectAssignations = dataSource.getRepository("ProjectAssignations");
let Users = dataSource.getRepository("Users");

export default {
  async getAllProjects() {
    return Projects.find();
  },
  async getProjectById(projectId) {
    return Projects.findOneBy({
      project_id: projectId,
    });
  },
  async getProjectByOwner(ownerId) {
    return Projects.findBy({
      owner_id: ownerId,
    });
  },
  async getAssignationsByProjectId(projectId) {
    let assignedUsers = await ProjectAssignations.findBy({
      project_id: projectId,
    });
    let users;

    if (assignedUsers.length) {
      users = await Users.createQueryBuilder("user")
        .where("user.user_id IN (:...ids)", {
          ids: assignedUsers.map((assignation) => assignation.user_id),
        })
        .getMany();
    } else {
      users = assignedUsers;
    }

    return users;
  },
  async getAvailablAssignationsByProjectId(projectId) {
    let assignedUsers = await ProjectAssignations.findBy({
      project_id: projectId,
    });
    let users;

    if (assignedUsers.length) {
      users = await Users.createQueryBuilder("user")
        .where("user.user_id NOT IN (:...ids)", {
          ids: assignedUsers.map((assignation) => assignation.user_id),
        })
        .andWhere("(user.user_role = 'Developer')")
        .getMany();
    } else {
      users = await Users.findBy({
        user_role: "Developer",
      });
    }

    return users;
  },
  async createProject(ownerId, ownerName, projectName) {
    return Projects.save({
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

    let users;

    if (assignedUsers.length) {
      users = await Users.createQueryBuilder("user")
        .where("user.user_id NOT IN (:...ids)", {
          ids: assignedUsers.map((assignation) => assignation.user_id),
        })
        .andWhere("(user.user_role = 'Developer')")
        .getMany();
    } else {
      users = await Users.findBy({
        user_role: "Developer",
      });
    }

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
  async deleteProject(projectId, ownerId) {
    await Projects.delete({
      project_id: projectId,
    });

    return await Projects.findBy({
      owner_id: ownerId,
    });
  },
  async getProjectsByAssignationId(userId) {
    let assignations = await ProjectAssignations.findBy({
      user_id: userId,
    });

    let projects = await Projects.createQueryBuilder("project")
      .where("project.project_id IN (:...ids)", {
        ids: assignations.map((assignation) => assignation.project_id),
      })
      .getMany();
      
    return projects;
  },
};
