import express from "express";
import {signupUser,loginUser, logoutUser, followUnfollowUser, updateUser, getUserProfile} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/profile/:username",getUserProfile);
router.post("/signup",signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute , followUnfollowUser); //id is variable here
router.put("/update/:id", protectRoute , updateUser); //id is variable here

export default router;


