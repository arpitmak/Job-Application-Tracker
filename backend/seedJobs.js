// seedJobs.js
require("dotenv").config();
const mongoose = require("mongoose");
const Job = require("./src/models/jobApplications");

const USER_ID = "69787c0686be11ed5df30ef3";

const jobs = [
  {
    user: USER_ID,
    company: "Google",
    role: "Software Engineer Intern",
    jobLink: "https://careers.google.com/",
    jobDescription: "Internship role focused on backend + systems.",
    status: "applied",
    notes: "Applied via careers portal."
  },
  {
    user: USER_ID,
    company: "Amazon",
    role: "Frontend Developer",
    jobLink: "https://www.amazon.jobs/",
    jobDescription: "React + UI performance + component libraries.",
    status: "interview",
    notes: "HR round done, waiting for tech interview."
  },
  {
    user: USER_ID,
    company: "Microsoft",
    role: "Software Engineer",
    jobLink: "https://careers.microsoft.com/",
    jobDescription: "Full-stack role, strong DS/Algo required.",
    status: "rejected",
    notes: "Rejected after OA."
  },
  {
    user: USER_ID,
    company: "Flipkart",
    role: "Backend Developer",
    jobLink: "https://www.flipkartcareers.com/",
    jobDescription: "Node.js APIs, MongoDB, caching and queues.",
    status: "applied",
    notes: "Applied via LinkedIn."
  },
  {
    user: USER_ID,
    company: "Swiggy",
    role: "SDE 1",
    jobLink: "https://careers.swiggy.com/",
    jobDescription: "Microservices + REST APIs.",
    status: "applied",
    notes: "Resume tailored for backend."
  },
  {
    user: USER_ID,
    company: "Zomato",
    role: "MERN Stack Developer",
    jobLink: "https://www.zomato.com/careers",
    jobDescription: "MERN + scalable web apps.",
    status: "interview",
    notes: "Interview scheduled."
  },
  {
    user: USER_ID,
    company: "Paytm",
    role: "Node.js Developer",
    jobLink: "https://paytm.com/careers/",
    jobDescription: "API development, auth, payments domain.",
    status: "applied",
    notes: "Applied via referral."
  },
  {
    user: USER_ID,
    company: "Razorpay",
    role: "Backend Engineer",
    jobLink: "https://razorpay.com/jobs/",
    jobDescription: "Payments infra, Node.js, DB design.",
    status: "applied",
    notes: "Strong match due to Razorpay experience."
  },
  {
    user: USER_ID,
    company: "CRED",
    role: "Frontend Engineer",
    jobLink: "https://careers.cred.club/",
    jobDescription: "React, animations, UI polish.",
    status: "applied",
    notes: "Need portfolio links."
  },
  {
    user: USER_ID,
    company: "PhonePe",
    role: "SDE Intern",
    jobLink: "https://www.phonepe.com/careers/",
    jobDescription: "Internship in platform engineering.",
    status: "applied",
    notes: "Applied on campus portal."
  },
  {
    user: USER_ID,
    company: "Meesho",
    role: "SDE 1",
    jobLink: "https://careers.meesho.com/",
    jobDescription: "Backend + distributed systems basics.",
    status: "applied",
    notes: "Resume submitted."
  },
  {
    user: USER_ID,
    company: "Walmart Global Tech",
    role: "Software Engineer",
    jobLink: "https://careers.walmart.com/",
    jobDescription: "Backend services, cloud, scalable systems.",
    status: "applied",
    notes: "Waiting for response."
  },
  {
    user: USER_ID,
    company: "TCS",
    role: "Assistant System Engineer",
    jobLink: "https://www.tcs.com/careers",
    jobDescription: "Entry-level software development role.",
    status: "applied",
    notes: "Backup option."
  },
  {
    user: USER_ID,
    company: "Infosys",
    role: "System Engineer",
    jobLink: "https://www.infosys.com/careers/",
    jobDescription: "Full-stack training + project allocation.",
    status: "applied",
    notes: "Applied online."
  },
  {
    user: USER_ID,
    company: "Zoho",
    role: "Software Developer",
    jobLink: "https://www.zoho.com/careers.html",
    jobDescription: "Problem-solving + product engineering.",
    status: "interview",
    notes: "Preparing for coding round."
  },
  {
    user: USER_ID,
    company: "Freshworks",
    role: "Frontend Developer",
    jobLink: "https://www.freshworks.com/company/careers/",
    jobDescription: "React + UI + REST integrations.",
    status: "applied",
    notes: "Applied via careers page."
  },
  {
    user: USER_ID,
    company: "Deloitte",
    role: "Analyst (Tech)",
    jobLink: "https://www2.deloitte.com/careers",
    jobDescription: "Tech consulting + dev work.",
    status: "applied",
    notes: "Need follow-up."
  },
  {
    user: USER_ID,
    company: "Accenture",
    role: "Associate Software Engineer",
    jobLink: "https://www.accenture.com/in-en/careers",
    jobDescription: "Entry-level dev + training.",
    status: "applied",
    notes: "Applied via campus drive."
  },
  {
    user: USER_ID,
    company: "IBM",
    role: "Software Engineer Intern",
    jobLink: "https://www.ibm.com/careers",
    jobDescription: "Internship in software engineering.",
    status: "applied",
    notes: "Waiting for OA."
  },
  {
    user: USER_ID,
    company: "Adobe",
    role: "Software Engineer",
    jobLink: "https://adobe.wd5.myworkdayjobs.com/",
    jobDescription: "Strong DSA + product engineering.",
    status: "offer",
    notes: "Offer received, review compensation & joining."
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    const result = await Job.insertMany(jobs);
    console.log(`✅ Inserted ${result.length} jobs for user ${USER_ID}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
}

seed();
