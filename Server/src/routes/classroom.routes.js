import express from 'express';
import { createClassroom, createAssignment, addStudents, getAllClassrooms } from '../controllers/classroom.controller.js';
import {protectRoute} from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getAllClassrooms);
router.post('/createClassroom', protectRoute, createClassroom);
router.post('/createAssignment', protectRoute, createAssignment);
router.post('/addStudents', protectRoute, addStudents);
export default router;