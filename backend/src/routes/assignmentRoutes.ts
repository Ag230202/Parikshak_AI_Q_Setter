import { Router } from 'express';
import { createAssignment, getAssignments, getAssignmentById, updateAssignment, deleteAssignment } from '../controllers/assignmentController';

const router = Router();

router.post('/', createAssignment);
router.get('/', getAssignments);
router.get('/:id', getAssignmentById);
router.patch('/:id', updateAssignment);
router.delete('/:id', deleteAssignment);

export default router;
