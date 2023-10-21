import User from "../models/User.js";
import Post from "../models/Post.js";

// Create Post post --> http://localhost:3001/post
export const CreatePost = async (req, res) => {
    try {
        // Extract Data From Request
        const { userId, postPicturePath, description } = req.body;

        // Fetch User Details with User ID
        const user = await User.findById(userId);

        // Creating and Saving the post
        const post = await Post.create({
            firstName: user.firstName,
            lastName: user.lastName,
            userId,
            description,
            postPicturePath,
            userPicturePath: user.picturePath,
            location: user.location,
            like: {},
            comments: {}
        });
        await post.save();

        // Retrive all the post
        const allPosts = await Post.find({});

        // Sending Response 
        res.status(201).json(allPosts);

    } catch (error) {
        // Sending Response as unhandled Error
        res.status(500).json({ error })
    }
}

// GetFeed posts get --> http://localhost:3001/post
export const GetFeedPosts = async (req, res) => {
    try {
        // Retrive all the post
        const allPosts = await Post.find({});

        // Sending Response 
        res.status(201).json(allPosts);
    } catch (error) {
        // Sending Response as unhandled Error
        res.status(500).json({ error })
    }
}

// Get User posts get --> http://localhost:3001/post/:userId/posts
export const GetUserPosts = async (req, res) => {
    try {
        // Extract data from params
        const { userId } = req.params;
        // Retrive a User  post
        const userPost = await Post.find({});

        // Sending Response 
        res.status(201).json(allPosts);
    } catch (error) {
        // Sending Response as unhandled Error
        res.status(500).json({ error })
    }
}

// Like the post patch -->  http://localhost:3001/post/:id/like
export const LikePost = async (req, res) => {
    try {
        // Extract postId and userId from params and request body
        const { id } = req.params;
        const { userId } = req.body;

        // Find the post using ID
        const post = await Post.findById({ _id: id });

        // Search and store the User Liked or Not
        const isLiked = post.likes.get(userId);

        // User already liked userId going to delete to remove OR The post has liked
        if (isLiked)
            post.likes.delete(userId);
        else
            post.likes.set(userId, true);

        // Save the updated post
        await post.save();

        // Send the response as post 
        res.status(200).json(post);

    } catch (error) {
        // Sending Response as unhandled Error
        res.status(500).json({ error })
    }
}