const Job = require("../models/jobModel");

const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({});
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No jobs found"
            });
        }
        return res.status(200).json({
            success: true,
            jobs,
            message: "All jobs fetched successfully",
        });
    } catch (error) {
        console.error("Error fetching all jobs:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",

        });
    }
};

const getJobsByLocation = async (req, res) => {
    try {
        const { location } = req.query;

        if (!location) {
            return res.status(400).json({
                success: false,
                message: "Location query is required"
            });
        }

        const jobs = await Job.find({
            location: { $regex: location, $options: "i" },
        });

        return res.status(200).json({
            success: true,
            jobs,
            message: "Jobs fetched successfully",
        });
    } catch (error) {
        console.error("Error filtering jobs by location:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

module.exports = {
    getAllJobs, getJobsByLocation,
};
