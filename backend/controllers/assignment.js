// controllers/assignment.js
const Assignment = require("../models/assignment"); // Adjust import path
const Course = require("../models/course"); // Adjust import path
const User = require("../models/user"); // Adjust import path

// Get Instructor Assignments
exports.getInstructorAssignments = async (req, res) => {
  try {
    console.log("Getting instructor assignments...");
    console.log("User ID:", req.user.id);
    console.log("User Role:", req.user.accountType);

    // Find all assignments created by this instructor
    const assignments = await Assignment.find({
      instructor: req.user.id,
    })
      .populate("course", "courseName")
      .populate("instructor", "firstName lastName email")
      .sort({ createdAt: -1 });

    console.log("Found assignments:", assignments.length);

    return res.status(200).json({
      success: true,
      message: "Instructor assignments fetched successfully",
      data: assignments,
    });
  } catch (error) {
    console.error("GET INSTRUCTOR ASSIGNMENTS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch instructor assignments",
      error: error.message,
    });
  }
};

// Create Assignment
exports.createAssignment = async (req, res) => {
  try {
    console.log("Creating assignment...");
    console.log("Request body:", req.body);
    console.log("User ID:", req.user.id);

    const {
      title,
      description,
      courseId,
      dueDate,
      points,
      instructions,
      submissionType,
      resources,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !courseId ||
      !dueDate ||
      !points ||
      !instructions ||
      !submissionType
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    // Check if course exists and instructor owns it
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check if the instructor owns the course
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to create assignment for this course",
      });
    }

    // Create assignment
    const assignment = new Assignment({
      title,
      description,
      course: courseId,
      instructor: req.user.id,
      dueDate: new Date(dueDate),
      points: parseInt(points),
      instructions,
      submissionType,
      resources: resources || "",
    });

    await assignment.save();

    // Populate the assignment with course and instructor details
    const populatedAssignment = await Assignment.findById(assignment._id)
      .populate("course", "courseName")
      .populate("instructor", "firstName lastName email");

    console.log("Assignment created successfully:", populatedAssignment._id);

    return res.status(201).json({
      success: true,
      message: "Assignment created successfully",
      data: populatedAssignment,
    });
  } catch (error) {
    console.error("CREATE ASSIGNMENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create assignment",
      error: error.message,
    });
  }
};

// Get Course Assignments
exports.getCourseAssignments = async (req, res) => {
  try {
    const { courseId } = req.params;
    console.log("Getting assignments for course:", courseId);

    const assignments = await Assignment.find({ course: courseId })
      .populate("instructor", "firstName lastName email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Course assignments fetched successfully",
      data: assignments,
    });
  } catch (error) {
    console.error("GET COURSE ASSIGNMENTS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch course assignments",
      error: error.message,
    });
  }
};

// Get Assignment Details
exports.getAssignmentDetails = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    console.log("Getting assignment details for:", assignmentId);

    const assignment = await Assignment.findById(assignmentId)
      .populate("course", "courseName")
      .populate("instructor", "firstName lastName email");

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Assignment details fetched successfully",
      data: assignment,
    });
  } catch (error) {
    console.error("GET ASSIGNMENT DETAILS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch assignment details",
      error: error.message,
    });
  }
};

// Submit Assignment (Student)
exports.submitAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { submission } = req.body;

    console.log("Submitting assignment:", assignmentId);
    console.log("Student ID:", req.user.id);

    // Check if assignment exists
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    // Check if assignment is still open
    if (new Date() > assignment.dueDate) {
      return res.status(400).json({
        success: false,
        message: "Assignment submission deadline has passed",
      });
    }

    // Create or update submission
    const existingSubmissionIndex = assignment.submissions.findIndex(
      (sub) => sub.student.toString() === req.user.id
    );

    const submissionData = {
      student: req.user.id,
      submission,
      submittedAt: new Date(),
      status: "submitted",
    };

    if (existingSubmissionIndex !== -1) {
      // Update existing submission
      assignment.submissions[existingSubmissionIndex] = submissionData;
    } else {
      // Add new submission
      assignment.submissions.push(submissionData);
    }

    await assignment.save();

    return res.status(200).json({
      success: true,
      message: "Assignment submitted successfully",
    });
  } catch (error) {
    console.error("SUBMIT ASSIGNMENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit assignment",
      error: error.message,
    });
  }
};

// Grade Assignment (Instructor)
exports.gradeAssignment = async (req, res) => {
  try {
    const { assignmentId, submissionId } = req.params;
    const { grade, feedback } = req.body;

    console.log(
      "Grading assignment:",
      assignmentId,
      "submission:",
      submissionId
    );

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    // Check if instructor owns the assignment
    if (assignment.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to grade this assignment",
      });
    }

    // Find and update submission
    const submission = assignment.submissions.id(submissionId);
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    submission.grade = grade;
    submission.feedback = feedback;
    submission.status = "graded";
    submission.gradedAt = new Date();

    await assignment.save();

    return res.status(200).json({
      success: true,
      message: "Assignment graded successfully",
    });
  } catch (error) {
    console.error("GRADE ASSIGNMENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to grade assignment",
      error: error.message,
    });
  }
};

// Update Assignment
exports.updateAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const updateData = req.body;

    console.log("Updating assignment:", assignmentId);

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    // Check if instructor owns the assignment
    if (assignment.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this assignment",
      });
    }

    const updatedAssignment = await Assignment.findByIdAndUpdate(
      assignmentId,
      updateData,
      { new: true, runValidators: true }
    )
      .populate("course", "courseName")
      .populate("instructor", "firstName lastName email");

    return res.status(200).json({
      success: true,
      message: "Assignment updated successfully",
      data: updatedAssignment,
    });
  } catch (error) {
    console.error("UPDATE ASSIGNMENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update assignment",
      error: error.message,
    });
  }
};

// Delete Assignment
exports.deleteAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    console.log("Deleting assignment:", assignmentId);

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    // Check if instructor owns the assignment
    if (assignment.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this assignment",
      });
    }

    await Assignment.findByIdAndDelete(assignmentId);

    return res.status(200).json({
      success: true,
      message: "Assignment deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ASSIGNMENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete assignment",
      error: error.message,
    });
  }
};

// Get Student Assignments
exports.getStudentAssignments = async (req, res) => {
  try {
    console.log("Getting student assignments...");
    console.log("User ID:", req.user.id);

    // Find all assignments from courses the student is enrolled in
    const user = await User.findById(req.user.id).populate("courses");
    const courseIds = user.courses.map((course) => course._id);

    const assignments = await Assignment.find({
      course: { $in: courseIds },
    })
      .populate("course", "courseName")
      .populate("instructor", "firstName lastName email")
      .sort({ createdAt: -1 });

    // Add submission status for each assignment
    const assignmentsWithStatus = assignments.map((assignment) => {
      const submission = assignment.submissions.find(
        (sub) => sub.student.toString() === req.user.id
      );

      return {
        ...assignment.toObject(),
        submissionStatus: submission ? submission.status : "not_submitted",
        submittedAt: submission ? submission.submittedAt : null,
        grade: submission ? submission.grade : null,
        feedback: submission ? submission.feedback : null,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Student assignments fetched successfully",
      data: assignmentsWithStatus,
    });
  } catch (error) {
    console.error("GET STUDENT ASSIGNMENTS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch student assignments",
      error: error.message,
    });
  }
};
