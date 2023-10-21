import express from 'express';
// Controllers for Managing Routes;
import { Login } from '../controllers/auth.controller.js';

const router = express.Router();

// Auth Routes
router.post('/login', Login);

export default router;