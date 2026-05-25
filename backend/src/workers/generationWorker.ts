import { Worker, Job } from 'bullmq';
import Redis from 'ioredis';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Assignment from '../models/Assignment';
import { getIo } from '../sockets/socketManager';
import dotenv from 'dotenv';

dotenv.config();

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const connection = new Redis(REDIS_URL, { maxRetriesPerRequest: null });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  generationConfig: { responseMimeType: 'application/json' }
});

const processJob = async (job: Job) => {
  const { assignmentId, title, subject, instructions, totalQuestions, totalMarks, questionTypes } = job.data;
  const io = getIo();

  try {
    io.emit('generation-progress', { assignmentId, status: 'started' });

    const questionTypesFormatted = questionTypes && Array.isArray(questionTypes)
      ? questionTypes.map((qt: any) => `${qt.noOfQuestions} x ${qt.type} (${qt.marks} marks each)`).join(', ')
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

    await Assignment.findByIdAndUpdate(assignmentId, {
      status: 'completed',
      generatedPaper,
    });

    io.emit('generation-completed', { assignmentId });
  } catch (error) {
    console.error('Job processing failed:', error);
    await Assignment.findByIdAndUpdate(assignmentId, { status: 'failed' });
    io.emit('generation-failed', { assignmentId, error: 'Generation failed' });
    throw error;
  }
};

export const worker = new Worker('generation-queue', processJob, { connection });

worker.on('failed', (job, err) => {
  if (job) {
    console.error(`Job ${job.id} failed with error: ${err.message}`);
  }
});
