import express from "express";
import {signupUser,loginUser, logoutUser, followUnfollowUser} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/signup",signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute , followUnfollowUser); //id is variable here

export default router;


