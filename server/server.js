import dotenv from "dotenv";
dotenv.config();

import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import routesInit from "./routes.js";
import dataSource from "./data-source.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = {
  credentials: true,
  origin: process.env.URL || "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());
app.use(express.static(join(__dirname, "../client/build")));

dataSource
  .initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));
routesInit(app);

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
