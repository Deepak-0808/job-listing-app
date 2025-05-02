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




// "Job ID (Numeric)": "33411379",
// "title": "SAP Project Manager",
// "company": "Executive Softway Guild India Private Limited",
// "location": "Hyderabad, Bengaluru",
// "job_link": "https://www.foundit.in/job/33411379",
// "employment_type": "Permanent Job",
// "experience": "10-20 Years",
// "source": "foundit",
// "country": "India",
// "postedDateTime": {
//   "$date": "2024-12-23T07:22:17.710Z"
// },
// "companyImageUrl": "https://media.foundit.in/trex/search/public/images/companyLogoDefault.png",
// "min_exp": 10,
// "max_exp": 20
// },