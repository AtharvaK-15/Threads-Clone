import express from "express";
import createPost from "../controllers/postController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/create", protectRoute ,createPost); //create a post

export default router;