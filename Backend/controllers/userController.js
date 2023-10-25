import e from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import genTokenAndSetCookie from "../utils/helpers/GenToken&SetCookie.js";

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
            // generate token and set cookie
            
            genTokenAndSetCookie(res,newUser._id);

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

const loginUser = async (req,res)=>{
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");

        if(!user || !isPasswordCorrect){
            res.status(400).json({message:"Username or Password is incorrect"});
        }

        genTokenAndSetCookie(res,user._id);

        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            username:user.username,
        }); 

    } catch (error) {
        res.status(500).json({message:"Server Error"});
        console.log(error);
    }
}

const logoutUser = (req,res)=>{
    try {
        res.clearCookie("token","",{maxAge:1});
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        res.status(500).json({message:"Server Error"});
        console.log(error);
    }
}

const followUnfollowUser = async (req,res)=>{
    try {
        const {id} = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if(id === req.user._id){
            res.status(400).json({message:"You cannot follow/unfollow yourself"});
        }

        if(!userToModify){
            res.status(400).json({message:"User does not exist"});
        }

        const isFollowing = currentUser.following.includes(id);

        if(isFollowing){
            // unfollow: pull operation
            await User.findByIdAndUpdate(req.user._id,{$pull:{following:id}}); //remove id from following array of current user
            await User.findByIdAndUpdate(id,{$pull:{followers:req.user._id}}); //remove current user from followers array of user to modify
            res.status(200).json({message:"Unfollowed successfully"});
        }else{
            // follow: push operation
            await User.findByIdAndUpdate(req.user._id,{$push:{following:id}}); //add id to following array of current user
            await User.findByIdAndUpdate(id,{$push:{followers:req.user._id}}); //add current user to followers array of user to modify
            res.status(200).json({message:"Followed successfully"});
        }


    } catch (error) {
        res.status(500).json({message:"Server Error"});
        console.log("Error in followUnfollowUser: ",error);
    }
}

export {signupUser, loginUser, logoutUser, followUnfollowUser};