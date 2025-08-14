const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve uploaded files
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/uploads", express.static("uploads"));
const multer = require("multer");
app.get("/reviews", (req, res) => {
  res.json([
    {
      reviewId: 1,
      name: "Rahul Sharma",
      rating: 5,
      comment:
        "Fantastic course! The instructor explained MongoDB and Mongoose in a way that's easy to understand. The real-world project helped me land my first internship.",
      date: "2025-07-14",
      type: "positive",
    },
    {
      reviewId: 2,
      name: "Priya Mehta",
      rating: 4,
      comment:
        "Good course overall. The React section was very well structured, though I wish there were more advanced examples for Redux integration.",
      date: "2025-07-16",
      type: "positive",
    },
    {
      reviewId: 3,
      name: "Ankit Verma",
      rating: 5,
      comment:
        "Clear explanations, practical coding exercises, and up-to-date with the latest MERN stack features. Loved the deployment section!",
      date: "2025-07-18",
      type: "positive",
    },
    {
      reviewId: 4,
      name: "Neha Gupta",
      rating: 2,
      comment:
        "The course moves too fast in the backend section. I got lost during the Express middleware lesson and there wasn’t enough beginner-friendly guidance.",
      date: "2025-07-20",
      type: "negative",
    },
    {
      reviewId: 5,
      name: "Karan Singh",
      rating: 3,
      comment:
        "Average content. The basics are fine, but the real-time WebSocket part felt rushed and lacked detailed explanations.",
      date: "2025-07-22",
      type: "negative",
    },
    {
      reviewId: 6,
      name: "Simran Kaur",
      rating: 5,
      comment:
        "I really appreciate the hands-on approach. The blog application project tied all the concepts together perfectly.",
      date: "2025-07-24",
      type: "positive",
    },
    {
      reviewId: 7,
      name: "Vikram Joshi",
      rating: 4,
      comment:
        "Good pacing and explanations. The MongoDB aggregation framework section was especially helpful.",
      date: "2025-07-26",
      type: "positive",
    },
    {
      reviewId: 8,
      name: "Meera Nair",
      rating: 2,
      comment:
        "Some videos are outdated and the code examples no longer work with the latest React version. Needs updating.",
      date: "2025-07-28",
      type: "negative",
    },
    {
      reviewId: 9,
      name: "Rohit Kapoor",
      rating: 5,
      comment:
        "This course is worth every penny. From MongoDB basics to deploying on Render, everything was covered in depth.",
      date: "2025-07-30",
      type: "positive",
    },
    {
      reviewId: 10,
      name: "Anjali Menon",
      rating: 1,
      comment:
        "Very disappointing. The instructor skipped too many steps in the project build and didn’t explain why certain code was written.",
      date: "2025-08-01",
      type: "negative",
    },
    {
      reviewId: 11,
      name: "Deepak Kumar",
      rating: 4,
      comment:
        "Great for people with some prior JavaScript knowledge. I learned a lot about JWT authentication and protected routes.",
      date: "2025-08-03",
      type: "positive",
    },
    {
      reviewId: 12,
      name: "Shreya Das",
      rating: 3,
      comment:
        "Decent course, but the Q&A section responses were slow and sometimes unhelpful.",
      date: "2025-08-05",
      type: "negative",
    },
    {
      reviewId: 13,
      name: "Arjun Patel",
      rating: 5,
      comment:
        "Amazing explanation style and very relevant examples. The instructor made even complex concepts like React hooks easy to grasp.",
      date: "2025-08-07",
      type: "positive",
    },
    {
      reviewId: 14,
      name: "Pooja Sethi",
      rating: 2,
      comment:
        "Poor audio quality in some lessons made it hard to follow along. Also, no captions for non-native speakers.",
      date: "2025-08-09",
      type: "negative",
    },
    {
      reviewId: 15,
      name: "Manish Thakur",
      rating: 5,
      comment:
        "The best MERN stack course I’ve taken so far. The final project felt like building a real SaaS product.",
      date: "2025-08-11",
      type: "positive",
    },
  ]);
});

// Sample data
const students = [];
const totalStudents = 50; // total enrolled

// Generate dummy students
for (let i = 1; i <= totalStudents; i++) {
  students.push({
    id: i,
    name: `Student_${i}`,
  });
}

// Dummy course modules
const modules = ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5"];

// Helper to generate progress per student
function generateProgress(studentId) {
  // Random drop-off simulation: for simplicity, each module has a 10-50% chance of completion
  let progress = [];
  for (let mod of modules) {
    const completed = Math.random() > 0.3; // 70% chance completed
    progress.push({
      module: mod,
      completed,
      completedAt: completed
        ? new Date(Date.now() - Math.random() * 1000000000).toISOString()
        : null,
    });
  }
  return progress;
}

// Pagination for students list
app.get("/api/courses/:courseId/enrollments", (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;

  let startIndex = (page - 1) * limit;
  let endIndex = startIndex + limit;

  let results = students.slice(startIndex, endIndex);

  res.json({
    page,
    limit,
    total: totalStudents,
    students: results,
  });
});

// Get progress for a specific student
app.get("/api/courses/:courseId/students/:studentId/progress", (req, res) => {
  const studentId = parseInt(req.params.studentId);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  const progress = generateProgress(studentId);

  res.json({
    studentId,
    studentName: student.name,
    progress,
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Mock database
const learners = {
  123: {
    completedModules: ["HTML Basics", "CSS Intro"],
    quizScores: {
      "HTML Basics": 85,
      "CSS Intro": 60,
    },
    pendingModules: ["Flexbox", "JavaScript Basics"],
    phoneNumber: "9310069214",
  },
};

// Fetch learner progress
app.get("/learner/:id/progress", (req, res) => {
  const learner = learners[req.params.id];
  if (!learner) {
    return res.status(404).json({ error: "Learner not found" });
  }
  res.json({ studentId: req.params.id, ...learner });
});

// Handle assignment uploads
app.post("/learner/:id/assignment", upload.single("assignment"), (req, res) => {
  const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  res.json({
    studentId: req.params.id,
    fileUrl,
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
