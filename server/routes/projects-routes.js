import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import { authenticateToken } from "../middleware/authorization.js";
const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    let projects = null;
    const userId = req.query.user_id;
    console.log(req.query);
    if (userId) {
      projects = await pool.query(
        "SELECT * FROM projects WHERE owner_id = $1",
        [userId]
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

router.post("/", async (req, res) => {
  try {
    const projectName = req.body.project_name;
    const ownerName = req.body.user_name;
    const ownerId = req.body.user_id;

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

router.post("/update-user", async (req, res) => {
  try {
    const userRole = req.body.user_role;
    const userId = req.body.user_id;
    const users = await pool.query(
      "UPDATE users SET user_role = $1 WHERE user_id = $2 RETURNING user_role, user_id, user_name, user_email",
      [userRole, userId]
    );
    res.json({ ...users.rows[0] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

export default router;
