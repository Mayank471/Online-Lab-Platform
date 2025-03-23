import express from 'express';
import { createClassroom, createAssignment,addStudents } from '../controllers/classroom.controller.js';
import {protectRoute} from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/createClassroom', protectRoute, createClassroom);
router.post('/createAssignment', protectRoute, createAssignment);
router.post('/addStudents', protectRoute, addStudents);
export default router;