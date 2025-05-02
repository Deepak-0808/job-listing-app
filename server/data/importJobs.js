const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Job = require("../models/jobModel");
const jobData = require("./data.json");

dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL;

// Helper functions to sanitize input values
const getNumber = (val) =>
  typeof val === "object" && val !== null && "$numberLong" in val
    ? Number(val["$numberLong"])
    : Number(val);

const getDouble = (val) =>
  typeof val === "object" && val !== null && "$numberDouble" in val
    ? Number(val["$numberDouble"])
    : Number(val);

const getDate = (val) =>
  typeof val === "object" && val !== null && "$date" in val
    ? new Date(val["$date"])
    : new Date(val);

const getString = (val) =>
  typeof val === "string"
    ? val
    : (typeof val === "object" &&
       (val?.$numberDouble || val?.$numberLong)) ?
      String(val?.$numberDouble || val?.$numberLong) :
      "";

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const formattedJobs = jobData.map((job) => ({
      jobId: getNumber(job["Job ID (Numeric)"]),
      title: getString(job.title),
      company: getString(job.company),
      location: getString(job.location),
      job_link: getString(job.job_link),
      employment_type: getString(job.employment_type),
      experience: getString(job.experience),
      source: getString(job.source),
      country: getString(job.country),
      postedDateTime: getDate(job.postedDateTime),
      companyImageUrl: getString(job.companyImageUrl),
      min_exp: getNumber(job.min_exp),
      max_exp: getNumber(job.max_exp),
    }));

    await Job.insertMany(formattedJobs);
    console.log("✅ Job data imported successfully.");
    process.exit();
  })
  .catch((error) => {
    console.error("❌ Failed to import job data:", error);
    process.exit(1);
  });
