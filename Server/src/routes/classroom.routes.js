import express from 'express';
import { createClassroom, createAssignment, addStudents, getAllClassrooms, getClassroomAssignments, getAssignment } from '../controllers/classroom.controller.js';
import {protectRoute} from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getAllClassrooms);
router.post('/createClassroom', protectRoute, createClassroom);
router.post('/createAssignment', protectRoute, createAssignment);
router.post('/addStudents', protectRoute, addStudents);
router.get('/:classroomId/assignments', protectRoute, getClassroomAssignments);
router.get('/getassignment/:assignmentId', protectRoute, getAssignment);

export default router;