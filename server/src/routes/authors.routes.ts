import express from "express";
import controllers from "../controllers/Author";

const router = express.Router();

router.post("/create", controllers.createAuthor);
router.get("/get/:authorId", controllers.readAuthor);
router.get("/get/", controllers.readAll);
router.patch("/update/:authorId", controllers.updateAuthor);
router.delete("/delete/:authorId", controllers.deleteAuthor);

export default router;
