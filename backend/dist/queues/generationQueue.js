"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGenerationJob = exports.generationQueue = void 0;
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const connection = new ioredis_1.default(REDIS_URL, {
    maxRetriesPerRequest: null,
});
exports.generationQueue = new bullmq_1.Queue('generation-queue', { connection });
const addGenerationJob = async (assignmentId, assignmentData) => {
    await exports.generationQueue.add('generate-paper', {
        assignmentId,
        ...assignmentData,
    });
};
exports.addGenerationJob = addGenerationJob;
