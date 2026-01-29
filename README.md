# Job Application Tracker (MERN)

    Job Application Tracker is a full-stack web application that helps users manage and track their job applications in one place. 
    It supports secure user authentication, user-scoped job data, and features such as search, filtering, pagination, and 
    real-time status updates. The application includes a Smart Job Import feature that allows users to paste a job description 
    and automatically extract key details like company, role, and a short summary.This AI functionality runs entirely on the
    backend using a free LLM via OpenRouter, keeping API keys secure while reducing manual data entry.

## Tech Stack

### Backend

    - Node.js
    - Express
    - MongoDB (Mongoose)
    - JWT Authentication

### Frontend

    - React (Vite)
    - Axios (API client)
    - Modern UI components (custom styled)

## Features

### Core

    - User authentication (register, login) using JWT
    - Protected routes using auth middleware
    - User-specific job applications (no cross-user access)
    - Job Applications CRUD (create, edit, delete)
    - Pagination, filtering, and search

### Smart Feature (AI)

**Smart Job Import (Job Description → Auto-fill)**

    - Paste a job description and auto-fill:
      - Company
      - Role / Position
      - Short Summary (added into Notes)
    - Status remains manual (user-controlled)
    - AI runs server-side using a free OpenRouter LLM (API key never exposed)

---
