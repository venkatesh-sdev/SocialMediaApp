import express from 'express';
import { GetFeedPosts, GetUserPosts, LikePost } from '../controllers/post.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Get Posts
router.get("/", verifyToken, GetFeedPosts);
router.get("/:userId/posts", verifyToken, GetUserPosts);

// Update Posts
router.patch("/:id/like", verifyToken, LikePost);


export default router;