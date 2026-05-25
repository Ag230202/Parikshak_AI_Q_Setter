"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.worker = void 0;
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const generative_ai_1 = require("@google/generative-ai");
const Assignment_1 = __importDefault(require("../models/Assignment"));
const socketManager_1 = require("../sockets/socketManager");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const connection = new ioredis_1.default(REDIS_URL, { maxRetriesPerRequest: null });
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: { responseMimeType: 'application/json' }
});
const processJob = async (job) => {
    const { assignmentId, title, subject, instructions, totalQuestions, totalMarks, questionTypes } = job.data;
    const io = (0, socketManager_1.getIo)();
    try {
        io.emit('generation-progress', { assignmentId, status: 'started' });
        const questionTypesFormatted = questionTypes && Array.isArray(questionTypes)
            ? questionTypes.map((qt) => `${qt.noOfQuestions} x ${qt.type} (${qt.marks} marks each)`).join(', ')
            : '';
        const prompt = `
Generate an exam paper in JSON format only (no markdown, no explanations).
Subject: ${subject}
Topic/Title: ${title}
Instructions: ${instructions || 'None'}
Total Questions: ${totalQuestions}
Total Marks: ${totalMarks}
Question Types: ${questionTypesFormatted}

Schema:
{
  "sections": [
    {
      "title": "String",
      "instruction": "String",
      "questions": [
        {
          "question": "String",
          "difficulty": "easy | medium | hard",
          "marks": Number
        }
      ]
    }
  ]
}
    `;
        io.emit('generation-progress', { assignmentId, status: 'generating_content' });
        const result = await model.generateContent(prompt);
        const generatedText = result.response.text();
        const generatedPaper = JSON.parse(generatedText || '{}');
        await Assignment_1.default.findByIdAndUpdate(assignmentId, {
            status: 'completed',
            generatedPaper,
        });
        io.emit('generation-completed', { assignmentId });
    }
    catch (error) {
        console.error('Job processing failed:', error);
        await Assignment_1.default.findByIdAndUpdate(assignmentId, { status: 'failed' });
        io.emit('generation-failed', { assignmentId, error: 'Generation failed' });
        throw error;
    }
};
exports.worker = new bullmq_1.Worker('generation-queue', processJob, { connection });
exports.worker.on('failed', (job, err) => {
    if (job) {
        console.error(`Job ${job.id} failed with error: ${err.message}`);
    }
});
