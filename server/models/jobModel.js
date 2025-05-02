const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    jobId: { type: Number, unique: true },
    title: { type: String },
    company: { type: String },
    location: { type: String },
    job_link: { type: String },
    employment_type: { type: String },
    experience: { type: String },
    source: { type: String },
    country: { type: String },
    postedDateTime: { type: Date },
    companyImageUrl: { type: String },
    min_exp: { type: Number },
    max_exp: { type: Number },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Job", jobSchema);
