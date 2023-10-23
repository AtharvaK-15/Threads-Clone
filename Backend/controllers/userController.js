import e from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const signupUser = async (req,res)=>{
    try {
        const {name,email,username,password} = req.body;
        const user = await User.findOne({$or:[{email},{username}]}); //if email or username already exists

        if(user){
            res.status(400).json({message:"User already exists"});
        }

        // password hashing using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        // if user does not exist, then create a new user
        const newUser = new User({
            name,
            email,
            username,
            password:hashedPassword
        });

        await newUser.save();

        if(newUser){
            res.status(201).json({
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                username:newUser.username,
            });
        }else{
            res.status(400).json({message:"Invalid user data"});
        }

    } catch (error) {
        res.status(500).json({message:"Server Error"});
        console.log(error);
    }
}

export default signupUser;