import { Request, Response } from 'express';
import Assignment from '../models/Assignment';
import { addGenerationJob } from '../queues/generationQueue';

export const createAssignment = async (req: Request, res: Response) => {
  try {
    const assignment = new Assignment({ ...req.body, status: 'generating' });
    await assignment.save();
    
    // Add job to BullMQ
    await addGenerationJob(assignment._id.toString(), req.body);
    
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create assignment' });
  }
};

export const getAssignments = async (req: Request, res: Response) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
};

export const getAssignmentById = async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assignment' });
  }
};

export const updateAssignment = async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update assignment' });
  }
};

export const deleteAssignment = async (req: Request, res: Response) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete assignment' });
  }
};
