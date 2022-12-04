import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]; //Bearer
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
      if (error) {
        return res.status(403).json({ error: error.message });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).json({ error: "No token provided" });
  }
};

export { authenticateToken };
