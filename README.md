# VedaAI / Parikshak AI Q-Setter

An AI-powered question paper setter application that generates customized exam papers using Google Gemini 2.5 Flash.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Node.js** (v18 or higher recommended)
- **npm** or **pnpm**
- **MongoDB** (running locally on default port 27017, or a MongoDB Atlas URI)
- **Redis** (running locally on default port 6379)

---

## 1. Backend Setup

The backend is built with Node.js, Express, BullMQ (for background AI tasks), and MongoDB.

### Install Dependencies
Open a terminal and navigate to the backend directory:
```bash
cd backend
npm install
```

### Environment Variables
Create a `.env` file inside the `backend` directory:
```bash
touch backend/.env
```
Add the following configuration to `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/vedaai
REDIS_URL=redis://localhost:6379
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Make sure you have your Redis and MongoDB servers running before starting the backend).*

### Start the Backend Server
To start the backend in development mode:
```bash
npm run dev
```
To build and run for production:
```bash
npm run build
npm start
```

---

## 2. Frontend Setup

The frontend is a Next.js application located in the root directory.

### Install Dependencies
Open a **new** terminal at the root of the project:
```bash
npm install
```
*(If you face lockfile errors, use `npm install --no-frozen-lockfile` or `pnpm install`)*

### Environment Variables
Create a `.env.local` file in the root directory:
```bash
touch .env.local
```
Add the following configuration to `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Start the Frontend Server
To start the Next.js development server:
```bash
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000).

---

## Deployment (Render)

If you are deploying to Render, you will need to create two Web Services:

### Backend Service
- **Root Directory**: `backend`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Environment Variables**: Add `MONGO_URI`, `REDIS_URL` (from Render Redis instance), and `GEMINI_API_KEY`.

### Frontend Service
- **Root Directory**: `.` (leave blank or root)
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start` (or `next start`)
- **Environment Variables**: Set `NEXT_PUBLIC_API_URL` to your deployed backend URL.

---

## Deployment (Vercel - Frontend Only)

Vercel is the recommended platform for deploying Next.js applications.

1. Go to [Vercel](https://vercel.com) and create an account/login.
2. Click **Add New** -> **Project**.
3. Import your GitHub repository.
4. **Framework Preset**: Vercel will automatically detect **Next.js**.
5. **Root Directory**: Leave it as the default (`./`).
6. **Environment Variables**: Add `NEXT_PUBLIC_API_URL` and set its value to your deployed Render backend URL (e.g. `https://your-backend.onrender.com`).
7. Click **Deploy**.

Vercel will build and host your Next.js frontend globally with a free `.vercel.app` domain.
