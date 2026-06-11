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

Important for diagram questions: If a question type is "diagram" or needs a visual, set "hasDiagram" to true and provide a valid, fully formed SVG markup string in the "diagramSvg" field. The SVG must be detailed and appropriate for the subject (e.g., circuit or free-body diagrams for Physics; chemical structures for Chemistry; anatomical/cellular diagrams for Biology; geometry, charts, or coordinate graphs for Math). Use standard SVG elements (<rect>, <circle>, <path>, <text>, <line>, etc.) with clear strokes, fills, and labels. Ensure the SVG accurately represents the scenario. Do NOT use placeholder URLs.

Important for multiple-choice questions: Provide exactly 4 options (1 correct, 3 incorrect). Do NOT indicate which option is correct within the "options" array. Provide the correct answer separately in the "correctAnswer" field.

Schema:
{
  "sections": [
    {
      "title": "String",
      "instruction": "String",
      "questions": [
        {
          "question": "String",
          "options": ["String", "String", "String", "String"], // optional, exactly 4 options for MCQ
          "correctAnswer": "String", // optional, the correct option string
          "hasDiagram": "Boolean",
          "diagramSvg": "String",
          "difficulty": "easy | medium | hard",
          "marks": Number
        }
      ]
    }
  ]
}
    `;

    io.emit('generation-progress', { assignmentId, status: 'generating_content' });

    let generatedText = '';
    let generatedPaper;
    try {
      const result = await model.generateContent(prompt);
      generatedText = result.response.text();
      generatedPaper = JSON.parse(generatedText || '{}');
    } catch (llmError) {
      console.warn('LLM Generation failed on first attempt, retrying once in 5 seconds...', llmError);
      await new Promise(resolve => setTimeout(resolve, 5000));
      try {
        const result = await model.generateContent(prompt);
        generatedText = result.response.text();
        generatedPaper = JSON.parse(generatedText || '{}');
      } catch (retryError: any) {
        throw new Error(`LLM Generation failed after retry: ${retryError.message}`);
      }
    }

    await Assignment.findByIdAndUpdate(assignmentId, {
      status: 'completed',
      generatedPaper,
    });

    io.emit('generation-completed', { assignmentId });
  } catch (error) {
    console.error('Job processing failed:', error);
    await Assignment.findByIdAndUpdate(assignmentId, { status: 'failed' });
    io.emit('generation-failed', { assignmentId, error: 'Model is facing some issues. Please retry again.' });
    
    // Delete the assignment after 10 seconds so the user has time to see the failure
    setTimeout(async () => {
      try {
        await Assignment.findByIdAndDelete(assignmentId);
      } catch (err) {
        console.error('Failed to auto-delete assignment:', err);
      }
    }, 10000);
    
    throw error;
  }
};

export const worker = new Worker('generation-queue', processJob, { connection });

worker.on('failed', (job, err) => {
  if (job) {
    console.error(`Job ${job.id} failed with error: ${err.message}`);
  }
});
