import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { verifyToken } from "./middleware/auth.token";
import { register } from "./controllers/auth.controllers";
import { createDay } from "./controllers/days.controllers";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/users.routes";
import daysRoutes from "./routes/days.routes";

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

// INSTANTIATE EXPRESS
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(morgan("common"));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"), register);
app.post("/days", verifyToken, upload.single("picture"), createDay);

// ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/days", daysRoutes);

// DB CONNECTION AND START SERVER
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`⚡️[sever]: db connected, listening on port ${PORT}`)
    );
  })
  .catch((error) =>
    console.error(`Error connecting to the database. \n${error}`)
  );
