import express, { RequestHandler } from "express";
import mongoose from "mongoose";
import Logging from "./library/Logging";
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
    Logging.info(`⚡️[SUCCESS]: db connected`);
    // start server after successful connection to the database
    StartServer();
  })
  .catch((error) => {
    Logging.error(`⚡️[ERROR]: Unable to connect to the database: `);
    Logging.error(error);
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
  // LOGGING REQUESTS
  app.use((req, res, next) => {
    Logging.info(
      `⚡️[INFO]: Incoming: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );
    res.on("finish", () => {
      Logging.info(
        `⚡️[INFO]: Outgoing: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      );
    });
    next();
  });

  // MIDDLEWARES
  app.use(express.urlencoded({ limit: "30mb", extended: true }));
  app.use(express.json());
  app.use(helmet());
  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
  app.use(cors());

  // STATIC FILES
  app.use("/assets", express.static(path.join(rootDir, "public", "assets")));

  // ROUTES WITH FILES
  app.post("/auth/register", upload.single("picture"), register);
  app.post(
    "/days",
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
    Logging.error(`⚡️[ERROR]: ${error.message}`);
    return res.status(404).json({ message: error.message });
  });

  // START SERVER
  http.createServer(app).listen(config.server.port, () => {
    Logging.info(`⚡️[INFO]: Server listening on port ${config.server.port}`);
  });
};
