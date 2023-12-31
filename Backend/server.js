import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import {v2 as cloudinary} from "cloudinary";

dotenv.config();
const app = express();
const port = process.env.port;
connectDB();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

app.use(express.json());  //to parse json data in the req body
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);

app.listen(port,()=>console.log(`Hey server started on port ${port}`));
