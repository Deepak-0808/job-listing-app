const express = require("express");
const app = express();
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:3000",
  "https://job-listing-app-rho.vercel.app",
];


app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Routes
const jobs = require("./routes/jobRoutes");
app.use("/api/v1/jobs", jobs);

// Connect to DB and start server
const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
})();
