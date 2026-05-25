import { Queue } from 'bullmq';
import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const connection = new Redis(REDIS_URL, {
  maxRetriesPerRequest: null,
});

export const generationQueue = new Queue('generation-queue', { connection });

export const addGenerationJob = async (assignmentId: string, assignmentData: any) => {
  await generationQueue.add('generate-paper', {
    assignmentId,
    ...assignmentData,
  });
};
