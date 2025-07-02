const express = require("express");
const router = express.Router();

// Import assignment controllers
const {
  createAssignment,
  getCourseAssignments,
  getAssignmentDetails,
  submitAssignment,
  gradeAssignment,
  updateAssignment,
  deleteAssignment,
  getInstructorAssignments,
  getStudentAssignments,
} = require("../controllers/assignment");

// Import middleware
const { auth, isInstructor, isStudent } = require("../middleware/auth");

// ********************************************************************************************************
//                                      Assignment Routes
// ********************************************************************************************************

// Create Assignment (Instructor only)
router.post("/createAssignment", auth, isInstructor, createAssignment);

// Get all assignments for a specific course
router.get("/course/:courseId/assignments", auth, getCourseAssignments);

// Get single assignment details
router.get("/assignment/:assignmentId", auth, getAssignmentDetails);

// Submit assignment (Student only)
router.post(
  "/assignment/:assignmentId/submit",
  auth,
  isStudent,
  submitAssignment
);

// Grade assignment submission (Instructor only)
router.post(
  "/assignment/:assignmentId/submission/:submissionId/grade",
  auth,
  isInstructor,
  gradeAssignment
);

// Update assignment (Instructor only)
router.put("/assignment/:assignmentId", auth, isInstructor, updateAssignment);

// Delete assignment (Instructor only)
router.delete(
  "/assignment/:assignmentId",
  auth,
  isInstructor,
  deleteAssignment
);

// Get all assignments for instructor
router.get(
  "/instructor/assignments",
  auth,
  isInstructor,
  getInstructorAssignments
);

// Get all assignments for student
router.get("/student/assignments", auth, isStudent, getStudentAssignments);

module.exports = router;
