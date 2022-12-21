import express from "express";
import bcrypt from "bcrypt";
import { authenticateToken } from "../middleware/authorization.js";
import { setRefreshToken } from "../utils/jwt-helper.js";
import { validateUserRole, validateUser } from "./validators/user.js";
import usersService from "./services/users-service.js";
const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const userRole = req.query.user_role;
    let users;

    if (userRole) {
      users = await usersService.getUserByEmail(userRole);
    } else {
      users = await usersService.getAllUsers();
    }

    res.json({ users: users.rows });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/", validateUser, async (req, res) => {
  try {
    const name = req.query.user_name;
    const email = req.query.user_email;
    const password = req.query.user_password;
    const hashedPassword = await bcrypt.hash(password, 10);

    const users = await usersService.createUser(name, email, hashedPassword);

    res.json({ users: users.rows[0] });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/update-user", validateUserRole, async (req, res) => {
  try {
    const role = req.body.user_role;
    const userId = req.body.user_id;
    const users = await usersService.updateUserRole(role, userId);

    setRefreshToken(users.rows[0]);

    res.json({ ...users.rows[0] });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
