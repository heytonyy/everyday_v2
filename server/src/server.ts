import express, { RequestHandler } from "express";
import mongoose from "mongoose";
import { morganMiddleware, ChalkLogger } from "./library/Logging";
import { config } from "./config/config";
import http from "http";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/users.routes";
import daysRoutes from "./routes/days.routes";
import controllers from "./controllers/days.controllers";
import { register } from "./controllers/auth.controllers";
import { verifyToken } from "./middleware/auth.token";
import path from "path";

// CONFIGURATIONS
const rootDir = path.resolve();

// INSTANTIATE EXPRESS
const app = express();

// DB CONNECTION & SERVER START
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    ChalkLogger.info(`⚡️[SUCCESS]: db connected`);
    // start server after successful connection to the database
    StartServer();
  })
  .catch((error) => {
    ChalkLogger.error(`⚡️[ERROR]: Unable to connect to the database: `);
    ChalkLogger.error(error);
  });

// FILE STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(rootDir, "public", "assets"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// this function is called after connecting to the database
const StartServer = () => {
  // MIDDLEWARES
  app.use(express.urlencoded({ limit: "30mb", extended: true }));
  app.use(express.json());
  app.use(helmet());
  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
  app.use(cors());
  app.use(morganMiddleware);

  // STATIC FILES
  app.use("/assets", express.static(path.join(rootDir, "public", "assets")));

  // ROUTES WITH FILES
  app.post("/auth/register", upload.single("picture"), register);
  app.post(
    "/days/create",
    verifyToken as typeof verifyToken & RequestHandler,
    upload.single("picture"),
    controllers.createDay
  );

  // ROUTES
  app.use("/auth", authRoutes);
  app.use("/users", userRoutes);
  app.use("/days", daysRoutes);

  // HEALTH CHECK
  app.get("/health", (req, res, next) => {
    res.status(200).json({ status: "UP AND READY TO GO" });
  });

  // ERROR HANDLING
  app.use((req, res, next) => {
    const error = new Error("ERROR HANDLING CATCH ALL");
    ChalkLogger.error(`⚡️[ERROR]: ${error.message}`);
    return res.status(404).json({ message: error.message });
  });

  // START SERVER
  http.createServer(app).listen(config.server.port, () => {
    ChalkLogger.info(
      `⚡️[INFO]: Server listening on port ${config.server.port}`
    );
  });
};
