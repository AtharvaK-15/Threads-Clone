import User from "../models/userModel.js";
import Post from "../models/postModel.js";

const createPost = async (req, res) => {
    try {
        const {postedBy,text,img} = req.body;
        if(!postedBy || !text) return res.status(400).json({message:"PostedBy and Text fields are required!"});
        // if img is not provided its fine as it is not a required field in a twitter/threads post

        const user = await User.findById(postedBy); //check if user who is posting exists
        if(!user) return res.status(400).json({message:"User does not exist!"});

        if(user._id.toString() !== req.user._id.toString()) return res.status(401).json({message:"Unauthorized!"}); //check if the user who is posting is the same as the user who is logged in

        const maxLength = 500;
        if(text.length > maxLength) return res.status(400).json({message:`Text length should be less than ${maxLength} characters!`});

        const newPost = new Post({postedBy,text,img});
        await newPost.save();
        //save is mongoose method to save the data to the database

        res.status(201).json({message:"Post created successfully!",post:newPost});

    } catch (error) {
        res.status(500).json({message:error.message});
        console.log("Error in createPost: ",error.message);
    }
}

export default createPost;