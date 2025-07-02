// services/operations/assignmentAPI.js
import { apiConnector } from "../apiConnector";
import { assignmentEndpoints } from "../apis";
import toast from "react-hot-toast";

const {
  CREATE_ASSIGNMENT_API,
  GET_COURSE_ASSIGNMENTS_API,
  GET_ASSIGNMENT_DETAILS_API,
  SUBMIT_ASSIGNMENT_API,
  GRADE_ASSIGNMENT_API,
  UPDATE_ASSIGNMENT_API,
  DELETE_ASSIGNMENT_API,
  GET_INSTRUCTOR_ASSIGNMENTS_API,
  GET_STUDENT_ASSIGNMENTS_API,
} = assignmentEndpoints;

// Create Assignment (Instructor)
export const createAssignment = async (assignmentData, token) => {
  const toastId = toast.loading("Creating Assignment...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      CREATE_ASSIGNMENT_API,
      assignmentData,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.success) {
      throw new Error("Could Not Create Assignment");
    }

    toast.success("Assignment Created Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE ASSIGNMENT API ERROR............", error);
    toast.error(error.response?.data?.message || "Could Not Create Assignment");
  }
  toast.dismiss(toastId);
  return result;
};

// Get Course Assignments
export const getCourseAssignments = async (courseId, token) => {
  let result = null;
  try {
    const response = await apiConnector(
      "GET",
      GET_COURSE_ASSIGNMENTS_API.replace(":courseId", courseId),
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Assignments");
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("GET COURSE ASSIGNMENTS API ERROR............", error);
    toast.error(error.response?.data?.message || "Could Not Fetch Assignments");
  }
  return result;
};

// Get Assignment Details
export const getAssignmentDetails = async (assignmentId, token) => {
  let result = null;
  try {
    const response = await apiConnector(
      "GET",
      GET_ASSIGNMENT_DETAILS_API.replace(":assignmentId", assignmentId),
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Assignment Details");
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("GET ASSIGNMENT DETAILS API ERROR............", error);
    toast.error(
      error.response?.data?.message || "Could Not Fetch Assignment Details"
    );
  }
  return result;
};

// Submit Assignment (Student)
export const submitAssignment = async (assignmentId, submissionData, token) => {
  const toastId = toast.loading("Submitting Assignment...");
  let result = false;
  try {
    const response = await apiConnector(
      "POST",
      SUBMIT_ASSIGNMENT_API.replace(":assignmentId", assignmentId),
      submissionData,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.success) {
      throw new Error("Could Not Submit Assignment");
    }

    toast.success("Assignment Submitted Successfully");
    result = true;
  } catch (error) {
    console.log("SUBMIT ASSIGNMENT API ERROR............", error);
    toast.error(error.response?.data?.message || "Could Not Submit Assignment");
  }
  toast.dismiss(toastId);
  return result;
};

// Grade Assignment (Instructor)
export const gradeAssignment = async (
  assignmentId,
  submissionId,
  gradeData,
  token
) => {
  const toastId = toast.loading("Grading Assignment...");
  let result = false;
  try {
    const response = await apiConnector(
      "POST",
      GRADE_ASSIGNMENT_API.replace(":assignmentId", assignmentId).replace(
        ":submissionId",
        submissionId
      ),
      gradeData,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.success) {
      throw new Error("Could Not Grade Assignment");
    }

    toast.success("Assignment Graded Successfully");
    result = true;
  } catch (error) {
    console.log("GRADE ASSIGNMENT API ERROR............", error);
    toast.error(error.response?.data?.message || "Could Not Grade Assignment");
  }
  toast.dismiss(toastId);
  return result;
};

// Update Assignment (Instructor)
export const updateAssignment = async (assignmentId, updateData, token) => {
  const toastId = toast.loading("Updating Assignment...");
  let result = null;
  try {
    const response = await apiConnector(
      "PUT",
      UPDATE_ASSIGNMENT_API.replace(":assignmentId", assignmentId),
      updateData,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.success) {
      throw new Error("Could Not Update Assignment");
    }

    toast.success("Assignment Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("UPDATE ASSIGNMENT API ERROR............", error);
    toast.error(error.response?.data?.message || "Could Not Update Assignment");
  }
  toast.dismiss(toastId);
  return result;
};

// Delete Assignment (Instructor)
export const deleteAssignment = async (assignmentId, token) => {
  const toastId = toast.loading("Deleting Assignment...");
  let result = false;
  try {
    const response = await apiConnector(
      "DELETE",
      DELETE_ASSIGNMENT_API.replace(":assignmentId", assignmentId),
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.success) {
      throw new Error("Could Not Delete Assignment");
    }

    toast.success("Assignment Deleted Successfully");
    result = true;
  } catch (error) {
    console.log("DELETE ASSIGNMENT API ERROR............", error);
    toast.error(error.response?.data?.message || "Could Not Delete Assignment");
  }
  toast.dismiss(toastId);
  return result;
};

// Get Instructor Assignments
export const getInstructorAssignments = async (token) => {
  let result = null;
  try {
    const response = await apiConnector(
      "GET",
      GET_INSTRUCTOR_ASSIGNMENTS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Assignments");
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("GET INSTRUCTOR ASSIGNMENTS API ERROR............", error);
    toast.error(error.response?.data?.message || "Could Not Fetch Assignments");
  }
  return result;
};

// Get Student Assignments
export const getStudentAssignments = async (token) => {
  let result = null;
  try {
    const response = await apiConnector(
      "GET",
      GET_STUDENT_ASSIGNMENTS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Student Assignments");
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("GET STUDENT ASSIGNMENTS API ERROR............", error);
    toast.error(error.response?.data?.message || "Could Not Fetch Assignments");
  }
  return result;
};
