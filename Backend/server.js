import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/connectDB.js";

const port = process.env.port;
connectDB();

app.listen(port,()=>console.log(`Hey server started on port ${port}`));