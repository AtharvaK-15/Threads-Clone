import e from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import genTokenAndSetCookie from "../utils/helpers/GenToken&SetCookie.js";
import {v2 as cloudinary} from "cloudinary";

const getUserProfile = async (req,res)=>{
    const {username} = req.params;
    try {
        const user = await User.findOne({username}).select("-password").select("-updatedAt") //select all fields except password
        if(!user){
            res.status(400).json({message:"User does not exist"});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message:"Server Error"});
        console.log("Error in getUserProfile: ",error);
        //sending error in the frontend in the form of an alert
        alert("Error in getUserProfile");
    }
}

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
                bio:newUser.bio,
                profilePic:newUser.profilePic,
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
            res.status(400).json({error:"Username or Password is incorrect"});
        }

        genTokenAndSetCookie(res,user._id);

        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            username:user.username,
            bio:user.bio,
            profilePic:user.profilePic,
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

const updateUser = async (req,res)=>{
    const {name,email,username,password,bio} = req.body;
    let {profilePic} = req.body;
    const userId = req.user._id; //_ means current user
    try {
        let user = await User.findById(userId);
        if(!user){
            res.status(400).json({message:"User does not exist"});
        }
        if(password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);
            user.password = hashedPassword;
        }

        if(profilePic){
            if(user.profilePic){
                await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
            }
            const uploadedResponse = await cloudinary.uploader.upload(profilePic);
            profilePic = uploadedResponse.secure_url;
        }

        // update user
        user.name = name || user.name;
        user.email = email || user.email;
        user.username = username || user.username;
        user.profilePic = profilePic || user.profilePic;
        user.bio = bio || user.bio;

        user = await user.save();
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            username:user.username,
            profilePic:user.profilePic,
            bio:user.bio,
            followers:user.followers,
            following:user.following
        });

    } catch (error) {
        res.status(500).json({message:"Server Error"});
        console.log("Error in updateUser: ",error);
    }
}

export {signupUser, loginUser, logoutUser, followUnfollowUser, updateUser, getUserProfile};