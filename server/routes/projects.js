import express from "express";
import { authenticateToken } from "../middleware/authorization.js";
import projectsService from "./services/projects-service.js";
const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    let projects = null;
    const ownerId = req.query.owner_id;
    const projectId = req.query.project_id;
    if (projectId) {
      projects = await projectsService.getProjectById(projectId);
    } else if (ownerId) {
      projects = await projectsService.getProjectByOwner(ownerId);
    } else {
      projects = await projectsService.getAllProjects();
    }

    res.json({ projects });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/assignations", authenticateToken, async (req, res) => {
  try {
    let assignations = null;
    const projectId = req.query.project_id;

    if (projectId) {
      assignations = await projectsService.getAssignationsByProjectId(
        projectId
      );
    }

    if (assignations) {
      res.json({ assignations: assignations });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/available-assignations", async (req, res) => {
  try {
    let assignations = null;
    const projectId = req.query.project_id;

    if (projectId) {
      assignations = await projectsService.getAvailablAssignationsByProjectId(
        projectId
      );
    }

    if (assignations) {
      res.json({ assignations: assignations });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/delete-assignation", async (req, res) => {
  try {
    const projectId = req.body.project_id;
    const userId = req.body.user_id;
    console.log(projectId,userId);
    const projectsAssignation = await projectsService.deleteAssignation(
      projectId,
      userId
    );
    res.json({ assignations: projectsAssignation });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const projectName = req.body.project_name;
    const ownerName = req.body.user_name;
    const ownerId = req.body.user_id;

    const project = await projectsService.createProject(
      ownerId,
      ownerName,
      projectName
    );

    res.json(project);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/projects-assignations", async (req, res) => {
  try {
    const userId = req.body.user_id;
    const projectId = req.body.project_id;

    const projectsAssignation = await projectsService.assignToProject(
      projectId,
      userId
    );
    res.json(projectsAssignation);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// router.get("/details", authenticateToken, async (req, res) => {
//   try {
//     let projects = null;
//     let employees = null;
//     const projectId = req.query.project_id;
//     if (projectId) {
//       employees = await pool.query(
//         "SELECT * FROM projects_assignations WHERE project_id = $1",
//         [projectId]
//       );
//       availableUsers = await pool.query(
//         "SELECT * FROM users WHERE NOT EXISTS (SELECT * FROM projects_assignations WHERE users.user_id = projects_assignations.employee_id);"[
//           projectId
//         ]
//       );
//       res.json({ employees: employees.rows });
//     }
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

export default router;
