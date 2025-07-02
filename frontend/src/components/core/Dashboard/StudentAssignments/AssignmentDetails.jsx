// ========================================
// components/core/Dashboard/StudentAssignments/AssignmentDetails.jsx
// ========================================

import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { getAssignmentDetails } from "../../../../services/operations/assignmentAPI"
import { formatDate } from "../../../../services/formatDate"
import IconBtn from "../../../common/IconBtn"
import { FiArrowLeft, FiClock, FiCheckCircle, FiFileText, FiLink, FiUpload } from "react-icons/fi"
import { MdOutlineAssignment } from "react-icons/md"

const AssignmentDetails = () => {
  const { assignmentId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  
  const [assignment, setAssignment] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      setLoading(true)
      const result = await getAssignmentDetails(assignmentId, token)
      if (result) {
        setAssignment(result)
      }
      setLoading(false)
    }
    
    fetchAssignmentDetails()
  }, [assignmentId, token])

  const getSubmissionTypeIcon = (type) => {
    switch (type) {
      case "file":
        return <FiUpload className="text-blue-500" />
      case "link":
        return <FiLink className="text-green-500" />
      case "text":
        return <FiFileText className="text-purple-500" />
      default:
        return <MdOutlineAssignment className="text-richblack-300" />
    }
  }

  const getSubmissionTypeText = (type) => {
    switch (type) {
      case "file":
        return "File Upload"
      case "link":
        return "Link Submission"
      case "text":
        return "Text Submission"
      default:
        return "Unknown"
    }
  }

  const isInstructor = assignment?.course?.instructor === user?._id
  const userSubmission = assignment?.submissions?.find(
    sub => sub.student._id === user?._id || sub.student === user?._id
  )
  
  const isOverdue = new Date() > new Date(assignment?.dueDate)
  const canSubmit = !userSubmission && !isOverdue && !isInstructor

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!assignment) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="text-center">
          <p className="text-2xl text-richblack-5">Assignment not found</p>
          <IconBtn
            text="Go Back"
            onclick={() => navigate(-1)}
          >
            <FiArrowLeft />
          </IconBtn>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-richblack-300 hover:text-richblack-5 transition-all"
        >
          <FiArrowLeft />
          Back
        </button>
        
        {canSubmit && (
          <IconBtn
            text="Submit Assignment"
            onclick={() => navigate(`/dashboard/submit-assignment/${assignmentId}`)}
          >
            <FiUpload />
          </IconBtn>
        )}
      </div>

      {/* Assignment Details */}
      <div className="rounded-lg border border-richblack-700 bg-richblack-800">
        {/* Header Section */}
        <div className="border-b border-richblack-700 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-richblack-5 mb-2">
                {assignment.title}
              </h1>
              <p className="text-richblack-300 text-lg">
                {assignment.course.courseName}
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-2xl font-bold text-yellow-50">
                {assignment.points} Points
              </p>
              <p className="text-richblack-300 text-sm">
                Total Points
              </p>
            </div>
          </div>
          
          {/* Status and Due Date */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <FiClock className="text-richblack-400" />
              <span className="text-richblack-300">
                Due: {formatDate(assignment.dueDate)}
              </span>
              {isOverdue && (
                <span className="px-2 py-1 bg-red-500 text-white rounded text-xs">
                  Overdue
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {getSubmissionTypeIcon(assignment.submissionType)}
              <span className="text-richblack-300">
                {getSubmissionTypeText(assignment.submissionType)}
              </span>
            </div>
            
            {userSubmission && (
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-green-500" />
                <span className="text-green-500">
                  {userSubmission.status === "graded" ? "Graded" : "Submitted"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="p-6 border-b border-richblack-700">
          <h2 className="text-xl font-semibold text-richblack-5 mb-3">
            Description
          </h2>
          <p className="text-richblack-300 leading-relaxed whitespace-pre-wrap">
            {assignment.description}
          </p>
        </div>

        {/* Instructions */}
        <div className="p-6 border-b border-richblack-700">
          <h2 className="text-xl font-semibold text-richblack-5 mb-3">
            Instructions
          </h2>
          <div className="text-richblack-300 leading-relaxed whitespace-pre-wrap">
            {assignment.instructions}
          </div>
        </div>

        {/* Resources */}
        {assignment.resources && assignment.resources.length > 0 && (
          <div className="p-6 border-b border-richblack-700">
            <h2 className="text-xl font-semibold text-richblack-5 mb-3">
              Resources
            </h2>
            <div className="space-y-2">
              {assignment.resources.map((resource, index) => (
                <div key={index} className="flex items-center gap-2">
                  <FiLink className="text-blue-500" />
                  <a
                    href={resource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-all"
                  >
                    {resource}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submission Status for Students */}
        {!isInstructor && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-richblack-5 mb-3">
              My Submission
            </h2>
            
            {userSubmission ? (
              <div className="bg-richblack-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-green-500 font-medium">
                    Submitted on {formatDate(userSubmission.submissionDate)}
                  </span>
                  {userSubmission.status === "graded" && (
                    <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">
                      Grade: {userSubmission.grade || 0}/{assignment.points}
                    </span>
                  )}
                </div>
                
                <div className="mb-3">
                  <h4 className="text-richblack-300 font-medium mb-2">Submission:</h4>
                  {assignment.submissionType === "file" ? (
                    <a
                      href={userSubmission.content}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                    >
                      <FiUpload />
                      View Submitted File
                    </a>
                  ) : assignment.submissionType === "link" ? (
                    <a
                      href={userSubmission.content}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                    >
                      <FiLink />
                      {userSubmission.content}
                    </a>
                  ) : (
                    <div className="bg-richblack-800 p-3 rounded border">
                      <p className="text-richblack-300 whitespace-pre-wrap">
                        {userSubmission.content}
                      </p>
                    </div>
                  )}
                </div>
                
                {userSubmission.feedback && (
                  <div>
                    <h4 className="text-richblack-300 font-medium mb-2">Feedback:</h4>
                    <div className="bg-richblack-800 p-3 rounded border">
                      <p className="text-richblack-300 whitespace-pre-wrap">
                        {userSubmission.feedback}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-richblack-700 rounded-lg p-4 text-center">
                {isOverdue ? (
                  <div>
                    <p className="text-red-400 mb-2">
                      Submission deadline has passed
                    </p>
                    <p className="text-richblack-400 text-sm">
                      You can no longer submit this assignment
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-yellow-400 mb-2">
                      Not submitted yet
                    </p>
                    <IconBtn
                      text="Submit Assignment"
                      onclick={() => navigate(`/dashboard/submit-assignment/${assignmentId}`)}
                    >
                      <FiUpload />
                    </IconBtn>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* All Submissions for Instructor */}
        {isInstructor && assignment.submissions && assignment.submissions.length > 0 && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-richblack-5 mb-3">
              Submissions ({assignment.submissions.length})
            </h2>
            <div className="space-y-4">
              {assignment.submissions.map((submission) => (
                <div key={submission._id} className="bg-richblack-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-richblack-5 font-medium">
                      {submission.student.firstName} {submission.student.lastName}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-richblack-400 text-sm">
                        {formatDate(submission.submissionDate)}
                      </span>
                      {submission.status === "graded" ? (
                        <span className="px-2 py-1 bg-green-500 text-white rounded text-xs">
                          {submission.grade || 0}/{assignment.points}
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-yellow-500 text-richblack-900 rounded text-xs">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-richblack-400 text-sm">
                    {submission.student.email}
                  </div>
                  
                  {submission.feedback && (
                    <div className="mt-2 p-2 bg-richblack-800 rounded text-sm">
                      <strong>Feedback:</strong> {submission.feedback}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AssignmentDetails