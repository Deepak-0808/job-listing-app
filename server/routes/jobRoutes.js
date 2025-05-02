const express = require("express");
const router = express.Router();
const { getAllJobs, getJobsByLocation } = require("../controllers/jobController");

router.get("/getAllJobs", getAllJobs);
router.get("/getJobsByLocation", getJobsByLocation);

module.exports = router;
