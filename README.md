# Job Listing App

A full-stack Job Listing application built using the MERN stack. This app allows users to view job postings with filtering capabilities.

---

## 🛠 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Deployment**: Vercel (Frontend), Render (Backend)

---


## ✅ Features
- List all available jobs
- Responsive UI using Tailwind CSS
- Location-based filtering
- REST API with Express.js
- Modal for job detail view
- Axios-based API integration
- Tailwind CSS for styling
- Environment-based configuration
- Deployed to Vercel & Render

---

## 📌 Deployment Notes
- Frontend: Deployed on Vercel
- Backend: Deployed on Render
- CORS: Configured properly to allow frontend-backend communication after deployment

---

## 🚀 Live URLs

- 🔗 **Frontend**: [https://job-listing-app-rho.vercel.app](https://job-listing-app-rho.vercel.app)
- 🔗 **Backend**: [https://job-listing-app-ruoa.onrender.com](https://job-listing-app-ruoa.onrender.com)

  > ℹ️ These links may take a few seconds to load if hosted on free-tier Render/Vercel.

---

## 💻 Steps to Run the Project Locally

### Prerequisites
- Node.js installed
- MongoDB instance running (local or Atlas)

---

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/job-listing-app.git
cd job-listing-app

```

### 2. Setup and run the backend

```bash
cd server
npm install

```

#### Create a .env file inside the server folder:

```bash
PORT=5000
MONGO_URL=your_mongodb_connection_string
```

#### Then run:

```bash
npm start
```

### 3. Setup and run the frontend

```bash
cd ../client
npm install
```

#### Create a .env file inside the client folder:

```bash
REACT_APP_API_BASE_URL=http://localhost:5000 or your_backend_url
```

#### Then run:

```bash
npm start
```

### 4. Visit App:
- Open your browser at http://localhost:3000

---

## 🙋 Assumptions

- The project focuses on **location-based filtering** of job listings.
- The backend returns data in a structure that matches frontend expectations.
- Deployment is expected on platforms like Vercel (frontend) and Render (backend).
- No authentication or role-based access was required unless stated.

---

## ⚠️ Challenges Faced

- `.env` file not being read in `server/` folder – fixed using correct `dotenv` setup.
- Git mistakenly treated `client/` as a submodule – resolved by deleting the `.git` directory inside `client/`.
- CORS errors occurred when frontend and backend were hosted on different domains – resolved using proper `cors` configuration in Express.
- Environment variable management in Vercel required manual setting via the dashboard.
- Keeping frontend and backend deployments in sync to avoid API endpoint mismatches.

