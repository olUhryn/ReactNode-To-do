import express from "express";
import { authenticateToken } from "../middleware/authorization.js";
import projectsService from "./services/projects-service.js";
import tasksService from "./services/tasks-service.js";
import {
  validateProject,
  validateTask,
  validateComment,
} from "./validators/project.js";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    let projects = null;
    const ownerId = req.query.owner_id;
    const projectId = req.query.project_id;
    const assignationId = req.query.user_id;
    if (projectId) {
      projects = await projectsService.getProjectById(projectId);
    } else if (ownerId) {
      projects = await projectsService.getProjectByOwner(ownerId);
    } else if (assignationId) {
      projects = await projectsService.getProjectsByAssignationId(
        assignationId
      );
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

    const projectsAssignation = await projectsService.deleteAssignation(
      projectId,
      userId
    );
    res.json({ assignations: projectsAssignation });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/", validateProject, async (req, res) => {
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

router.post("/task", validateTask, async (req, res) => {
  try {
    const taskName = req.body.task_name;
    const ownerId = req.body.owner_id;
    const projectId = req.body.project_id;

    const task = await tasksService.createTask(taskName, ownerId, projectId);

    res.json(task);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/tasks", authenticateToken, async (req, res) => {
  try {
    let tasks = null;
    const projectId = req.query.project_id;
    tasks = await tasksService.getTasks(projectId);

    res.json({ tasks });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/task", authenticateToken, async (req, res) => {
  try {
    let task = null;
    const taskId = req.query.task_id;
    task = await tasksService.getTask(taskId);

    res.json(task);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/update-task", async (req, res) => {
  try {
    const taskId = req.body.task_id;
    const taskDescription = req.body.task_description;
    const taskStatus = req.body.task_status;
    const assignedUser = req.body.assigned_user_id;

    const task = await tasksService.updateTask(
      taskId,
      taskDescription,
      taskStatus,
      assignedUser
    );

    res.json(task);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/delete-task", async (req, res) => {
  try {
    const taskId = req.body.task_id;

    const task = await tasksService.deleteTask(taskId);

    res.json(task);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/task/comment", validateComment, async (req, res) => {
  try {
    const taskId = req.body.task_id;
    const commentDescription = req.body.comment_description;
    const ownerId = req.body.owner_id;

    const comment = await tasksService.createComment(
      taskId,
      commentDescription,
      ownerId
    );

    res.json(comment);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/task/comments", authenticateToken, async (req, res) => {
  try {
    let comments = null;
    const taskId = req.query.task_id;
    comments = await tasksService.getComments(taskId);

    res.json(comments);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/delete-project", async (req, res) => {
  try {
    const projectId = req.body.project_id;
    const ownerId = req.body.owner_id;

    const proejcts = await projectsService.deleteProject(projectId, ownerId);

    res.json(proejcts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
export default router;
