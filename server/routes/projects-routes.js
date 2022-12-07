import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import { authenticateToken } from "../middleware/authorization.js";
const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    let projects = null;
    const ownerId = req.query.onwer_id;
    const projectId = req.query.project_id;
    console.log(req.query);
    if (projectId) {
      projects = await pool.query(
        "SELECT * FROM projects WHERE project_id = $1",
        [projectId]
      );
    } else if (ownerId) {
      projects = await pool.query(
        "SELECT * FROM projects WHERE owner_id = $1",
        [ownerId]
      );
    } else {
      projects = await pool.query("SELECT * FROM projects");
    }

    console.log(projects);
    res.json({ projects: projects.rows });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/assignations", authenticateToken, async (req, res) => {
  try {
    let projects = null;
    let employees = null;
    const projectId = req.query.project_id
    console.log(req.query);
    if(projectId){
      employees = await pool.query(
        "SELECT * FROM projects_assignations WHERE project_id = $1",
        [projectId]
      );
      res.json({ employees: employees.rows });
    }

    console.log(projects);
   
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/details", authenticateToken, async (req, res) => {
  try {
    let projects = null;
    let employees = null;
    const projectId = req.query.project_id
    console.log(req.query);
    if(projectId){
      employees = await pool.query(
        "SELECT * FROM projects_assignations WHERE project_id = $1",
        [projectId]
      );
      availableUsers = await pool.query(
        'SELECT * FROM users WHERE NOT EXISTS (SELECT * FROM projects_assignations WHERE users.user_id = projects_assignations.employee_id);'
        [projectId]
      );
      res.json({ employees: employees.rows });
    }   
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const projectName = req.body.project_name;
    const ownerName = req.body.user_name;
    const ownerId = req.body.user_id;

    // pool.query(
    //   "INSERT INTO projects_assignations (project_id, employee_id, project_name, employee_name) VALUES ($1,$2,$3,$4) RETURNING *",
    //   [ownerId, ownerName, projectName, ]
    // );
    const projects = await pool.query(
      "INSERT INTO projects (owner_id, owner_name, project_name) VALUES ($1,$2,$3) RETURNING *",
      [ownerId, ownerName, projectName]
    );

    res.json(projects.rows[0]);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

router.post("/projects-assignations", async (req, res) => {
  try {
    const projectName = req.body.project_name;
    const employeeName = req.body.employee_name;
    const employeeId = req.body.employee_id;
    const projectId = req.body.project_id;

    const projectsAssignations = await pool.query(
      "INSERT INTO projects_assignations (project_id, employee_id, project_name, employee_name) VALUES ($1,$2,$3, $4) RETURNING *",
      [projectId, employeeId, projectName, employeeName]
    );

    res.json(projectsAssignations.rows[0]);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

export default router;
