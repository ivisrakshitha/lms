// ========================================
// components/core/Dashboard/StudentAssignments/SubmitAssignment.jsx
// ========================================

import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { getAssignmentDetails, submitAssignment } from "../../../../services/operations/assignmentAPI"
import { formatDate } from "../../../../services/formatDate"
import IconBtn from "../../../common/IconBtn"
import { FiArrowLeft, FiUpload, FiFileText, FiLink, FiCalendar, FiUser, FiBook } from "react-icons/fi"
import { toast } from "react-hot-toast"

const SubmitAssignment = () => {
  const { assignmentId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  
  const [assignment, setAssignment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm()

  const watchedContent = watch("content")

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      setLoading(true)
      const result = await getAssignmentDetails(assignmentId, token)
      if (result) {
        setAssignment(result)
        
        // Check if user already submitted or if it's overdue
        const userSubmission = result.submissions?.find(
          sub => sub.student._id === user?._id || sub.student === user?._id
        )
        
        if (userSubmission) {
          toast.error("You have already submitted this assignment")
          navigate(`/dashboard/assignment/${assignmentId}`)
          return
        }
        
        if (new Date() > new Date(result.dueDate)) {
          toast.error("Assignment submission deadline has passed")
          navigate(`/dashboard/assignment/${assignmentId}`)
          return
        }
      }
      setLoading(false)
    }
    
    fetchAssignmentDetails()
  }, [assignmentId, token, user?._id, navigate])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size should be less than 10MB")
        return
      }
      setSelectedFile(file)
    }
  }

  const onSubmit = async (data) => {
    if (!assignment) return
    
    setSubmitting(true)
    
    try {
      let submissionData = new FormData()
      
      if (assignment.submissionType === "file") {
        if (!selectedFile) {
          toast.error("Please select a file to upload")
          setSubmitting(false)
          return
        }
        submissionData.append("file", selectedFile)
        submissionData.append("content", selectedFile.name)
      } else {
        if (!data.content || data.content.trim() === "") {
          toast.error("Please provide submission content")
          setSubmitting(false)
          return
        }
        submissionData.append("content", data.content.trim())
      }
      
      const result = await submitAssignment(assignmentId, submissionData, token)
      
      if (result) {
        toast.success("Assignment submitted successfully!")
        navigate(`/dashboard/assignment/${assignmentId}`)
      }
    } catch (error) {
      console.error("Submission error:", error)
      toast.error("Failed to submit assignment. Please try again.")
    }
    
    setSubmitting(false)
  }

  const getSubmissionTypeIcon = (type) => {
    switch (type) {
      case "file":
        return <FiUpload className="text-blue-500" />
      case "link":
        return <FiLink className="text-green-500" />
      case "text":
        return <FiFileText className="text-purple-500" />
      default:
        return null
    }
  }

  const getSubmissionInstructions = (type) => {
    switch (type) {
      case "file":
        return "Upload a file (PDF, DOC, DOCX, TXT, etc. - Max 10MB)"
      case "link":
        return "Provide a valid URL link to your submission"
      case "text":
        return "Enter your text submission in the text area below"
      default:
        return ""
    }
  }

  const isOverdue = assignment && new Date() > new Date(assignment.dueDate)
  const timeLeft = assignment ? new Date(assignment.dueDate) - new Date() : 0
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24))

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
    <div className="mx-auto max-w-[1000px] py-10">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={() => navigate(`/dashboard/assignment/${assignmentId}`)}
          className="flex items-center gap-2 text-richblack-300 hover:text-richblack-5 transition-colors"
        >
          <FiArrowLeft />
          <span>Back to Assignment</span>
        </button>
      </div>

      {/* Assignment Info Card */}
      <div className="rounded-lg border border-richblack-700 bg-richblack-800 p-6 mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-richblack-5 mb-2">
              {assignment.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-richblack-300">
              <div className="flex items-center gap-1">
                <FiBook />
                <span>{assignment.course?.courseName}</span>
              </div>
              <div className="flex items-center gap-1">
                <FiUser />
                <span>{assignment.instructor?.firstName} {assignment.instructor?.lastName}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm text-richblack-300 mb-1">
              <FiCalendar />
              <span>Due: {formatDate(assignment.dueDate)}</span>
            </div>
            {!isOverdue && (
              <div className={`text-sm ${daysLeft <= 1 ? 'text-red-400' : daysLeft <= 3 ? 'text-yellow-400' : 'text-green-400'}`}>
                {daysLeft > 0 ? `${daysLeft} days left` : 'Due today'}
              </div>
            )}
          </div>
        </div>
        
        {assignment.description && (
          <div className="mb-4">
            <h3 className="text-lg font-medium text-richblack-5 mb-2">Description</h3>
            <p className="text-richblack-100 whitespace-pre-wrap">{assignment.description}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-richblack-700 rounded-lg">
          <div className="text-center">
            <p className="text-richblack-300 text-sm">Total Points</p>
            <p className="text-richblack-5 text-lg font-semibold">{assignment.totalPoints}</p>
          </div>
          <div className="text-center">
            <p className="text-richblack-300 text-sm">Submission Type</p>
            <div className="flex items-center justify-center gap-2 mt-1">
              {getSubmissionTypeIcon(assignment.submissionType)}
              <span className="text-richblack-5 capitalize">{assignment.submissionType}</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-richblack-300 text-sm">Due Date</p>
            <p className="text-richblack-5">{formatDate(assignment.dueDate)}</p>
          </div>
        </div>
      </div>

      {/* Submission Form */}
      <div className="rounded-lg border border-richblack-700 bg-richblack-800 p-6">
        <h2 className="text-xl font-semibold text-richblack-5 mb-4">Submit Assignment</h2>
        
        <div className="mb-6 p-4 bg-richblack-700 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            {getSubmissionTypeIcon(assignment.submissionType)}
            <span className="text-richblack-5 font-medium">Submission Instructions</span>
          </div>
          <p className="text-richblack-300 text-sm">
            {getSubmissionInstructions(assignment.submissionType)}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {assignment.submissionType === "file" && (
            <div>
              <label className="block text-sm font-medium text-richblack-5 mb-2">
                Upload File
              </label>
              <div className="border-2 border-dashed border-richblack-600 rounded-lg p-6 text-center hover:border-richblack-500 transition-colors">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <FiUpload className="text-4xl text-richblack-400" />
                  <div>
                    <p className="text-richblack-5 font-medium">Click to upload a file</p>
                    <p className="text-richblack-400 text-sm">PDF, DOC, DOCX, TXT, PPT, XLS (Max 10MB)</p>
                  </div>
                </label>
                {selectedFile && (
                  <div className="mt-4 p-3 bg-richblack-700 rounded-lg">
                    <p className="text-richblack-5 font-medium">{selectedFile.name}</p>
                    <p className="text-richblack-400 text-sm">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {(assignment.submissionType === "text" || assignment.submissionType === "link") && (
            <div>
              <label className="block text-sm font-medium text-richblack-5 mb-2">
                {assignment.submissionType === "link" ? "Submission Link" : "Submission Content"}
              </label>
              {assignment.submissionType === "link" ? (
                <input
                  type="url"
                  {...register("content", {
                    required: "This field is required",
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: "Please enter a valid URL starting with http:// or https://"
                    }
                  })}
                  className="w-full px-3 py-2 border border-richblack-600 rounded-lg bg-richblack-700 text-richblack-5 focus:outline-none focus:ring-2 focus:ring-yellow-50 focus:border-transparent"
                  placeholder="https://example.com/your-submission"
                />
              ) : (
                <textarea
                  {...register("content", {
                    required: "This field is required",
                    minLength: {
                      value: 10,
                      message: "Content must be at least 10 characters long"
                    }
                  })}
                  rows={8}
                  className="w-full px-3 py-2 border border-richblack-600 rounded-lg bg-richblack-700 text-richblack-5 focus:outline-none focus:ring-2 focus:ring-yellow-50 focus:border-transparent resize-vertical"
                  placeholder="Enter your assignment submission here..."
                />
              )}
              {errors.content && (
                <p className="text-red-400 text-sm mt-1">{errors.content.message}</p>
              )}
              {assignment.submissionType === "text" && watchedContent && (
                <p className="text-richblack-400 text-sm mt-1">
                  {watchedContent.length} characters
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-4 border-t border-richblack-700">
            <button
              type="button"
              onClick={() => navigate(`/dashboard/assignment/${assignmentId}`)}
              className="px-4 py-2 text-richblack-300 hover:text-richblack-5 transition-colors"
            >
              Cancel
            </button>
            <IconBtn
              type="submit"
              text={submitting ? "Submitting..." : "Submit Assignment"}
              disabled={submitting || isOverdue}
              customClasses={`${submitting || isOverdue ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <FiUpload />
            </IconBtn>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SubmitAssignment