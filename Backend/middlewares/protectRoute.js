import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
    try {
        const jwtToken = req.cookies.token;
        if (!jwtToken) {
            res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        req.user = user;

        next();

    } catch (error) {
        res.status(500).json({message:"Server Error"});
        console.log("Error in protectRoute middleware: ", error);
    }
}

export default protectRoute;