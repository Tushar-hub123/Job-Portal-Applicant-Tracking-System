# 💼 Job Portal & Applicant Tracking System

A full-stack **Job Portal and Applicant Tracking System (ATS)** built using the **MERN stack**. The platform connects candidates and recruiters through a role-based system where candidates can discover and apply for jobs, while recruiters can manage job postings and track applications throughout the hiring process.

---

🌐 Live Deployment

Frontend (Vercel)
https://job-portal-applicant-tracking-syste.vercel.app

Backend API (Render)
https://job-portal-applicant-tracking-system.onrender.com


## 🚀 Features

### 👨‍💻 Candidate

- Candidate registration and login
- Secure authentication
- Create and manage candidate profile
- Upload resume
- Browse available jobs
- Search and filter jobs
- View detailed job information
- Apply for jobs
- Track submitted applications
- View application status
- Prevent duplicate applications

### 🧑‍💼 Recruiter

- Recruiter authentication
- Recruiter dashboard
- Create job postings
- Update job postings
- Delete job postings
- View posted jobs
- View applicants for each job
- View candidate information
- Download/view candidate resumes
- Shortlist candidates
- Reject applications
- Track application status

### 🔐 Security & Access Control

- Role-based authentication
- Protected routes
- JWT-based authentication
- Authorization middleware
- Secure API endpoints
- Environment variables for sensitive configuration

---

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- React Router
- Fetch API / Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer for file uploads

### Development Tools

- Git
- GitHub
- VS Code
- Postman

---

## 🏗️ Project Architecture

```text
Job-Portal-Applicant-Tracking-System/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── ...
│
└── README.md

🔄 Application Workflow

                    ## 🔄 Application Workflow

```text
                         JOB PORTAL & ATS
                                │
                ┌───────────────┼───────────────┐
                │               │               │
              Admin          Candidate       Recruiter
                │               │               │
             Login           Register          Login
                │               │               │
          Admin Dashboard   Candidate          Recruiter
                │            Dashboard         Dashboard
                │               │               │
        Manage Users       Browse Jobs       Manage Jobs
                │               │               │
        Manage Jobs        View Job          View Applicants
                │               │               │
        Manage Applications Apply for Job    Review Applications
                │               │               │
                │          Upload Resume            │
                │               │               │
                │               └──────┬────────────┘
                │                      │
                │               Application
                │                 Submitted
                │                      │
                │               Recruiter Reviews
                │                      │
                │             ┌────────┴────────┐
                │             │                 │
                │        Shortlisted         Rejected
                │             │
                │        Hiring Process
                │
                └────── Admin Oversight ──────┘


⚙️ Installation & Setup

1. Clone the Repository
git clone https://github.com/Tushar-hub123/Job-Portal-Applicant-Tracking-System.git

cd Job-Portal-Applicant-Tracking-System

🔧 Backend Setup

cd backend
npm install

Create a .env file inside the backend directory.

Example.
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start Server 
npm start

🎨 Frontend Setup

cd frontend
npm install
nom run dev