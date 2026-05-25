"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAssignment = exports.updateAssignment = exports.getAssignmentById = exports.getAssignments = exports.createAssignment = void 0;
const Assignment_1 = __importDefault(require("../models/Assignment"));
const generationQueue_1 = require("../queues/generationQueue");
const createAssignment = async (req, res) => {
    try {
        const assignment = new Assignment_1.default({ ...req.body, status: 'generating' });
        await assignment.save();
        // Add job to BullMQ
        await (0, generationQueue_1.addGenerationJob)(assignment._id.toString(), req.body);
        res.status(201).json(assignment);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create assignment' });
    }
};
exports.createAssignment = createAssignment;
const getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(assignments);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch assignments' });
    }
};
exports.getAssignments = getAssignments;
const getAssignmentById = async (req, res) => {
    try {
        const assignment = await Assignment_1.default.findById(req.params.id);
        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found' });
        }
        res.status(200).json(assignment);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch assignment' });
    }
};
exports.getAssignmentById = getAssignmentById;
const updateAssignment = async (req, res) => {
    try {
        const assignment = await Assignment_1.default.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found' });
        }
        res.status(200).json(assignment);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update assignment' });
    }
};
exports.updateAssignment = updateAssignment;
const deleteAssignment = async (req, res) => {
    try {
        await Assignment_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Assignment deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete assignment' });
    }
};
exports.deleteAssignment = deleteAssignment;
