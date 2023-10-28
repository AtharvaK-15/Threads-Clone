import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    text:{
        type:String,
        maxLength:500
    },
    img:{
        type:String
    },
    likes:{
        //array of users who liked the post
        type:[mongoose.Schema.Types.ObjectId],
        ref:'User',
        default:[]
    },
    replies:[
    {        
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        text:{
            type:String
        },
        // the below two fileds in order to avoid another fetch requests!
        userProfilePic:{
            type:String
        },
        username:{
            type:String
        }
    }
    ]

}, {
    timestamps:true
});

const Post = mongoose.model('Post',postSchema);

export default Post;