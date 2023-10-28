import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {getPosts,createPost, deletePost, likeUnlikePost, replytoPost} from "../controllers/postController.js";

const router = express.Router();

router.get("/:id", getPosts); //get all posts (tweets/threads
router.post("/create", protectRoute ,createPost); //create a post
router.delete("/:id",protectRoute ,deletePost); //delete a post
router.post("/like/:id",protectRoute, likeUnlikePost);
router.post("/reply/:id",protectRoute, replytoPost);

export default router;