// slices/assignmentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Assignment data
  assignments: [],
  currentAssignment: null,
  assignmentDetails: null,

  // Loading states
  loading: false,
  submissionLoading: false,
  gradingLoading: false,

  // Instructor specific
  instructorAssignments: [],
  assignmentSubmissions: [],

  // Student specific
  studentAssignments: [],
  mySubmissions: [],

  // Course assignments
  courseAssignments: [],

  // UI states
  editAssignment: null,
  showCreateModal: false,
  showSubmissionModal: false,
  showGradingModal: false,

  // Filters and pagination
  filters: {
    status: "all", // all, pending, submitted, graded, overdue
    course: "all",
    sortBy: "dueDate", // dueDate, title, created
    sortOrder: "asc", // asc, desc
  },

  // Statistics
  stats: {
    totalAssignments: 0,
    pendingAssignments: 0,
    submittedAssignments: 0,
    gradedAssignments: 0,
    overdueAssignments: 0,
  },
};

const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    // Loading states
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSubmissionLoading: (state, action) => {
      state.submissionLoading = action.payload;
    },
    setGradingLoading: (state, action) => {
      state.gradingLoading = action.payload;
    },

    // Assignment data management
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    setCurrentAssignment: (state, action) => {
      state.currentAssignment = action.payload;
    },
    setAssignmentDetails: (state, action) => {
      state.assignmentDetails = action.payload;
    },

    // Add new assignment
    addAssignment: (state, action) => {
      state.assignments.unshift(action.payload);
      state.instructorAssignments.unshift(action.payload);
    },

    // Update assignment
    updateAssignment: (state, action) => {
      const { assignmentId, updateData } = action.payload;

      // Update in assignments array
      const assignmentIndex = state.assignments.findIndex(
        (assignment) => assignment._id === assignmentId
      );
      if (assignmentIndex !== -1) {
        state.assignments[assignmentIndex] = {
          ...state.assignments[assignmentIndex],
          ...updateData,
        };
      }

      // Update in instructor assignments
      const instructorIndex = state.instructorAssignments.findIndex(
        (assignment) => assignment._id === assignmentId
      );
      if (instructorIndex !== -1) {
        state.instructorAssignments[instructorIndex] = {
          ...state.instructorAssignments[instructorIndex],
          ...updateData,
        };
      }

      // Update current assignment if it's the same
      if (state.currentAssignment?._id === assignmentId) {
        state.currentAssignment = { ...state.currentAssignment, ...updateData };
      }
    },

    // Remove assignment
    removeAssignment: (state, action) => {
      const assignmentId = action.payload;

      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== assignmentId
      );
      state.instructorAssignments = state.instructorAssignments.filter(
        (assignment) => assignment._id !== assignmentId
      );
      state.courseAssignments = state.courseAssignments.filter(
        (assignment) => assignment._id !== assignmentId
      );

      if (state.currentAssignment?._id === assignmentId) {
        state.currentAssignment = null;
      }
    },

    // Instructor specific
    setInstructorAssignments: (state, action) => {
      state.instructorAssignments = action.payload;
    },
    setAssignmentSubmissions: (state, action) => {
      state.assignmentSubmissions = action.payload;
    },

    // Student specific
    setStudentAssignments: (state, action) => {
      state.studentAssignments = action.payload;
    },
    setMySubmissions: (state, action) => {
      state.mySubmissions = action.payload;
    },

    // Add new submission
    addSubmission: (state, action) => {
      const submission = action.payload;
      state.mySubmissions.push(submission);

      // Update assignment status in student assignments
      const assignmentIndex = state.studentAssignments.findIndex(
        (assignment) => assignment._id === submission.assignmentId
      );
      if (assignmentIndex !== -1) {
        state.studentAssignments[assignmentIndex].submissionStatus =
          "submitted";
        state.studentAssignments[assignmentIndex].submission = submission;
      }
    },

    // Update submission grade
    updateSubmissionGrade: (state, action) => {
      const { submissionId, grade, feedback } = action.payload;

      // Update in submissions
      const submissionIndex = state.assignmentSubmissions.findIndex(
        (sub) => sub._id === submissionId
      );
      if (submissionIndex !== -1) {
        state.assignmentSubmissions[submissionIndex].grade = grade;
        state.assignmentSubmissions[submissionIndex].feedback = feedback;
        state.assignmentSubmissions[submissionIndex].gradedAt =
          new Date().toISOString();
      }

      // Update in my submissions if student
      const mySubmissionIndex = state.mySubmissions.findIndex(
        (sub) => sub._id === submissionId
      );
      if (mySubmissionIndex !== -1) {
        state.mySubmissions[mySubmissionIndex].grade = grade;
        state.mySubmissions[mySubmissionIndex].feedback = feedback;
        state.mySubmissions[mySubmissionIndex].gradedAt =
          new Date().toISOString();
      }
    },

    // Course assignments
    setCourseAssignments: (state, action) => {
      state.courseAssignments = action.payload;
    },

    // UI state management
    setEditAssignment: (state, action) => {
      state.editAssignment = action.payload;
    },
    setShowCreateModal: (state, action) => {
      state.showCreateModal = action.payload;
    },
    setShowSubmissionModal: (state, action) => {
      state.showSubmissionModal = action.payload;
    },
    setShowGradingModal: (state, action) => {
      state.showGradingModal = action.payload;
    },

    // Filters and sorting
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },

    // Statistics
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    },

    // Reset states
    resetAssignmentState: (state) => {
      return initialState;
    },
    clearCurrentAssignment: (state) => {
      state.currentAssignment = null;
      state.assignmentDetails = null;
    },
  },
});

export const {
  // Loading states
  setLoading,
  setSubmissionLoading,
  setGradingLoading,

  // Assignment data
  setAssignments,
  setCurrentAssignment,
  setAssignmentDetails,
  addAssignment,
  updateAssignment,
  removeAssignment,

  // Instructor specific
  setInstructorAssignments,
  setAssignmentSubmissions,

  // Student specific
  setStudentAssignments,
  setMySubmissions,
  addSubmission,
  updateSubmissionGrade,

  // Course assignments
  setCourseAssignments,

  // UI states
  setEditAssignment,
  setShowCreateModal,
  setShowSubmissionModal,
  setShowGradingModal,

  // Filters
  setFilters,
  resetFilters,

  // Statistics
  setStats,
  updateStats,

  // Reset
  resetAssignmentState,
  clearCurrentAssignment,
} = assignmentSlice.actions;

export default assignmentSlice.reducer;
