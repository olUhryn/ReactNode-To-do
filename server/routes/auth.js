import express from "express";
import { setRefreshToken, verifyJwt } from "../utils/jwt-helper.js";
import { validatePassword } from "../utils/bcrypt-helper.js";
import usersService from "./services/users-service.js";
const router = express.Router();

// database related logic ussually separate from routers
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = usersService.getUserByEmail(email);
    if (users.rows.length === 0) {
      return res.status(401).json({ error: "Email not found" });
    }

    const validPassword = await validatePassword(
      password,
      users.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json({ error: "Incorrect password" });
    } else {
      let token = setRefreshToken(res, users.rows[0]);
      return res.json(token);
    }
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
});

router.get("/refresh-token", async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      res.status(401).json({ error: "Null refresh token" });
    } else {
      verifyJwt(res, refreshToken);
    }
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
});

router.delete("/refresh-token", async (req, res) => {
  try {
    res.clearCookie("refresh_token");
  } catch (e) {
    res.status(401).json({ error: e.message });
    return res.status(200).json({ message: "Refresh token deleted" });
  }
});

export default router;
