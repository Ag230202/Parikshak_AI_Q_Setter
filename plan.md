# VedaAI – Full Stack Engineering Assignment

## Objective

Build an AI-powered Assessment Creator platform that allows teachers to:

- Create assignments
- Generate AI-powered question papers
- View structured exam output
- Download formatted PDFs
- Receive real-time generation updates

---

# Current Status

## Frontend Completed

Implemented:

- Responsive UI matching Figma
- Assignment CRUD pages
- Sidebar + Mobile Navigation
- Multi-step assignment creation form
- AI Toolkit page
- Library management page
- Assignment detail page
- Edit assignment page
- Mobile FAB
- Local state management
- UI polish and responsive layouts

Reference: :contentReference[oaicite:0]{index=0}

---

# Remaining Work

Main focus now:

1. Backend Architecture
2. AI Integration
3. Queue Processing
4. WebSocket Communication
5. MongoDB Persistence
6. PDF Export
7. Deployment

---

# Tech Stack

## Frontend

- Next.js
- TypeScript
- TailwindCSS
- Zustand
- Socket.IO Client

---

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Redis
- BullMQ
- Socket.IO

---

## AI

- OpenAI API (GPT-4.1-mini)

---

# Implementation Plan

# Phase 1 — Backend Setup

## Goal

Setup scalable backend architecture.

---

## Tasks

### 1. Initialize Backend

```bash
mkdir backend
npm init -y
```

Install dependencies:

```bash
npm install express cors dotenv mongoose ioredis bullmq socket.io openai zod
```

Dev dependencies:

```bash
npm install -D typescript ts-node-dev @types/node @types/express
```

---

### 2. Configure TypeScript

Create:

```txt
tsconfig.json
```

---

### 3. Setup Folder Structure

```txt
backend/
 ├── src/
 │    ├── config/
 │    ├── controllers/
 │    ├── routes/
 │    ├── services/
 │    ├── queues/
 │    ├── workers/
 │    ├── sockets/
 │    ├── models/
 │    ├── utils/
 │    └── server.ts
```

---

### 4. Environment Variables

Create:

```env
PORT=5000
MONGO_URI=
REDIS_URL=
OPENAI_API_KEY=
```

---

# Phase 2 — Database Design

## Goal

Store assignments and generated papers.

---

## MongoDB Schema

## Assignment Model

```ts
{
  title: string
  subject: string
  instructions: string
  dueDate: Date
  questionTypes: string[]
  totalQuestions: number
  totalMarks: number
  status: string
  generatedPaper: object
}
```

---

# Phase 3 — REST API

## Goal

Create backend APIs.

---

## APIs

### Create Assignment

```http
POST /api/assignments
```

Creates assignment and queue job.

---

### Get Assignment

```http
GET /api/assignments/:id
```

Returns generated paper.

---

### List Assignments

```http
GET /api/assignments
```

---

### Delete Assignment

```http
DELETE /api/assignments/:id
```

---

# Phase 4 — BullMQ Queue System

## Goal

Handle AI generation asynchronously.

---

## Flow

```txt
Frontend
   ↓
Express API
   ↓
BullMQ Queue
   ↓
Worker
   ↓
OpenAI
   ↓
MongoDB
   ↓
Socket Event
   ↓
Frontend Update
```

---

## Tasks

### Create Queue

```ts
generationQueue.ts
```

---

### Add Jobs

```ts
queue.add("generate-paper", data)
```

---

### Worker

Worker responsibilities:

- Build AI prompt
- Call OpenAI
- Parse response
- Store result
- Emit socket updates

---

# Phase 5 — AI Integration

## Goal

Generate structured question papers.

---

## OpenAI Strategy

Use:

```txt
gpt-4.1-mini
```

---

## AI Prompt Rules

- Return ONLY JSON
- No markdown
- No explanations
- Structured sections
- Include marks + difficulty

---

## Example Response

```json
{
  "sections": [
    {
      "title": "Section A",
      "instruction": "Attempt all questions",
      "questions": [
        {
          "question": "Define normalization.",
          "difficulty": "easy",
          "marks": 2
        }
      ]
    }
  ]
}
```

---

## Important

DO NOT directly render raw AI response.

Must:

1. Parse
2. Validate
3. Structure
4. Save

before rendering.

---

# Phase 6 — WebSocket Integration

## Goal

Provide real-time updates.

---

## Events

### Backend Emits

```txt
generation-started
generation-progress
generation-completed
generation-failed
```

---

## Frontend Listens

Display:

- Loading state
- Progress state
- Success notification

---

# Phase 7 — Frontend Integration

## Goal

Connect UI with backend.

---

## Tasks

### Replace localStorage

Current frontend uses localStorage.

Replace with:

```txt
REST APIs + MongoDB
```

---

### API Integration

Use:

```txt
axios
```

or

```txt
fetch
```

---

### Zustand Store

Manage:

- assignments
- loading states
- socket status
- AI generation status

---

# Phase 8 — Output Page Enhancement

## Goal

Render professional exam-paper layout.

---

## Required Sections

### Student Information

- Name
- Roll Number
- Section

---

### Question Sections

Each section contains:

- Title
- Instructions
- Questions
- Difficulty badge
- Marks

---

## UI Goals

- Real exam paper feel
- Clean spacing
- Mobile responsive
- Proper hierarchy

---

# Phase 9 — PDF Export

## Goal

Generate downloadable formatted PDF.

---

## Suggested Libraries

Frontend:

```txt
react-to-pdf
```

OR

```txt
jspdf
```

---

## PDF Must Include

- Header
- Student info
- Sections
- Questions
- Marks
- Proper alignment

---

# Phase 10 — Deployment

## Frontend

Deploy on:

- Vercel

---

## Backend

Deploy on:

- Render
OR
- Railway

---

## Database

Use:

- MongoDB Atlas
- Redis Cloud

---

# Phase 11 — README

## Must Include

- Project overview
- Architecture diagram
- Setup instructions
- Environment variables
- Screenshots
- API flow
- Queue flow
- WebSocket flow

---

# Architecture Overview

```txt
Frontend (Next.js)
   ↓
REST API (Express)
   ↓
BullMQ Queue
   ↓
Worker
   ↓
OpenAI API
   ↓
MongoDB
   ↓
Socket.IO
   ↓
Frontend Live Updates
```

---

# Priority Order

## Highest Priority

1. Backend APIs
2. BullMQ Queue
3. AI Generation
4. WebSocket updates
5. MongoDB integration

---

## Medium Priority

6. Output page polish
7. PDF Export

---

## Lowest Priority

8. Extra animations
9. Advanced dashboards

---

# Final Deliverables

## GitHub Repository

Must include:

- frontend/
- backend/
- README.md

---

## Live Deployment

Frontend:
- Vercel

Backend:
- Render/Railway

---

# Final Goal

Teacher should be able to:

1. Create assignment
2. Generate AI paper
3. View formatted exam
4. Download PDF
5. Receive real-time updates

with smooth UX and scalable backend architecture.