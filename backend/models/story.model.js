import mongoose from "mongoose";

const storySchema=new mongoose.Schema({
    author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
    mediaType:{
        type:String,
        enum:["image","video"],
        required:true
    },
    media:{
        type:String,
        required:true
    },
    viewers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ]
    ,
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:86400
    }
},{timestamps:true})

const Story=mongoose.model("Story",storySchema)
export default Story