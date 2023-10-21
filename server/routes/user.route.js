import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';

import {
    getUser,
    getUserFriends,
    addRemoveFriends
} from '../controllers/user.controller.js'

const router = express.Router();

/* Get Requests */

// Get Request For Get User Details
router.get('/:id', verifyToken, getUser);
// Get Request For Get User Friends Details
router.get('/:id/friends', verifyToken, getUserFriends);

/* Update Requests */

// Add and Remove Friends for the particular User
router.patch('/:id/:friendId', verifyToken, addRemoveFriends);

export default router;