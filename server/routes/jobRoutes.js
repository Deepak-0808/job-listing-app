const express = require("express");
const router = express.Router();
const { getAllJobs, getJobsByLocation } = require("../controllers/jobController");

// GET /api/v1/jobs
router.get("/getAllJobs", getAllJobs);
router.get("/getJobsByLocation", getJobsByLocation);

module.exports = router;
