import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import studentRouter from "./students/src/router.js";
import adminRouter from "./admin/src/router.js";
import connectDB from "./db.js";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/student", studentRouter);
app.use("/api/admin", adminRouter);

// Add port with a default value
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

// Error handling for unhandled promises
process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  process.exit(1);
});
