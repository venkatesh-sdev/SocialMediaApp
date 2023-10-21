import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    userId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: ""
    },
    userPicturePath: {
        type: String,
        default: ""
    },
    picturePath: {
        type: String,
        default: ""
    },
    likes: {
        type: Map,
        of: Boolean
    },
    comments: {
        type: Array,
        default: []
    },
    location: String,
}, { timestamps: true });

const Post = mongoose.model("Post", PostSchema);
export default Post;