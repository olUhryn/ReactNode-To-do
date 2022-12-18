import express from "express";
import bcrypt from "bcrypt";
import { authenticateToken } from "../middleware/authorization.js";
import { jwtTokens } from "../utils/jwt-helper.js";
import usersService from "./services/users-service";
const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const userRole = req.query.user_role;
    let users;

    if (userRole) {
      users = usersService.getUserByEmail(userRole);
    } else {
      users = usersService.getAllUsers();
    }

    res.json({ users: users.rows });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const name = req.query.user_name;
    const email = req.query.user_email;
    const password = req.query.user_password;
    const hashedPassword = await bcrypt.hash(password, 10);

    const users = usersService.createUser(name, email, hashedPassword);

    res.json({ users: users.rows[0] });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/update-user", async (req, res) => {
  try {
    const role = req.body.user_role;
    const userId = req.body.user_id;
    const users = usersService.updateUserRole(role, userId);

    let tokens = jwtTokens(users.rows[0]);
    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
    });

    res.json({ ...users.rows[0] });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
