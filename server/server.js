import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/users-routes.js";
import authRouter from "./routes/auth-routes.js";
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = { credentials: true, origin: process.env.URL || "http://localhost:3000" };

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());
app.use(express.static(join(__dirname, "../client/build")));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
