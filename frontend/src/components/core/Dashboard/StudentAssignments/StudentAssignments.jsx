// ========================================
// components/core/Dashboard/StudentAssignments/StudentAssignments.jsx
// ========================================

import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getStudentAssignments } from "../../../../services/operations/assignmentAPI"
import { formatDate } from "../../../../services/formatDate"
import { MdOutlineRemoveRedEye } from "react-icons/md"
import { FiClock, FiCheckCircle, FiAlertCircle } from "react-icons/fi"

const StudentAssignments = () => {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all") // all, submitted, pending, overdue

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true)
      const result = await getStudentAssignments(token)
      if (result) {
        setAssignments(result)
      }
      setLoading(false)
    }
    
    fetchAssignments()
  }, [token])

  const getStatusColor = (assignment) => {
    const now = new Date()
    const due = new Date(assignment.dueDate)
    
    if (assignment.hasSubmitted) {
      return assignment.submissions[0]?.status === "graded" ? "text-green-500" : "text-blue-500"
    }
    
    if (now > due) return "text-red-500"
    
    const diffTime = due - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays <= 1) return "text-yellow-500"
    return "text-richblack-300"
  }

  const getStatusIcon = (assignment) => {
    const now = new Date()
    const due = new Date(assignment.dueDate)
    
    if (assignment.hasSubmitted) {
      return assignment.submissions[0]?.status === "graded" ? 
        <FiCheckCircle className="text-green-500" /> : 
        <FiClock className="text-blue-500" />
    }
    
    if (now > due) return <FiAlertCircle className="text-red-500" />
    return <FiClock className="text-yellow-500" />
  }

  const getStatusText = (assignment) => {
    const now = new Date()
    const due = new Date(assignment.dueDate)
    
    if (assignment.hasSubmitted) {
      return assignment.submissions[0]?.status === "graded" ? 
        `Graded (${assignment.submissions[0]?.grade || 0}/${assignment.points})` : 
        "Submitted"
    }
    
    if (now > due) return "Overdue"
    
    const diffTime = due - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
    
    if (diffDays <= 1) {
      return diffHours <= 24 ? `Due in ${diffHours}h` : "Due tomorrow"
    }
    return `Due in ${diffDays} days`
  }

  const filteredAssignments = assignments.filter(assignment => {
    const now = new Date()
    const due = new Date(assignment.dueDate)
    
    switch (filter) {
      case "submitted":
        return assignment.hasSubmitted
      case "pending":
        return !assignment.hasSubmitted && now <= due
      case "overdue":
        return !assignment.hasSubmitted && now > due
      default:
        return true
    }
  })

  const getFilterCounts = () => {
    const now = new Date()
    return {
      all: assignments.length,
      submitted: assignments.filter(a => a.hasSubmitted).length,
      pending: assignments.filter(a => !a.hasSubmitted && now <= new Date(a.dueDate)).length,
      overdue: assignments.filter(a => !a.hasSubmitted && now > new Date(a.dueDate)).length
    }
  }

  const filterCounts = getFilterCounts()

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Assignments</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
              filter === "all" 
                ? "bg-yellow-50 text-richblack-900" 
                : "bg-richblack-700 text-richblack-300 hover:bg-richblack-600"
            }`}
          >
            All ({filterCounts.all})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
              filter === "pending" 
                ? "bg-yellow-50 text-richblack-900" 
                : "bg-richblack-700 text-richblack-300 hover:bg-richblack-600"
            }`}
          >
            Pending ({filterCounts.pending})
          </button>
          <button
            onClick={() => setFilter("submitted")}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
              filter === "submitted" 
                ? "bg-yellow-50 text-richblack-900" 
                : "bg-richblack-700 text-richblack-300 hover:bg-richblack-600"
            }`}
          >
            Submitted ({filterCounts.submitted})
          </button>
          <button
            onClick={() => setFilter("overdue")}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
              filter === "overdue" 
                ? "bg-yellow-50 text-richblack-900" 
                : "bg-richblack-700 text-richblack-300 hover:bg-richblack-600"
            }`}
          >
            Overdue ({filterCounts.overdue})
          </button>
        </div>
      </div>

      {filteredAssignments?.length === 0 ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="text-center">
            <p className="text-2xl text-richblack-5">
              {filter === "all" 
                ? "No assignments found" 
                : `No ${filter} assignments found`}
            </p>
            <p className="text-richblack-300 mt-2">
              {filter === "all" 
                ? "You don't have any assignments yet" 
                : `You don't have any ${filter} assignments`}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAssignments.map((assignment) => (
            <div
              key={assignment._id}
              className="rounded-lg border border-richblack-700 bg-richblack-800 p-6 hover:bg-richblack-700 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(assignment)}
                    <h3 className="text-xl font-semibold text-richblack-5">
                      {assignment.title}
                    </h3>
                    <span className={`text-sm font-medium ${getStatusColor(assignment)}`}>
                      {getStatusText(assignment)}
                    </span>
                  </div>
                  
                  <p className="text-richblack-300 mb-3 line-clamp-2">
                    {assignment.description}
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm text-richblack-400">
                    <span className="flex items-center gap-1">
                      <strong>Course:</strong> {assignment.course.courseName}
                    </span>
                    <span className="flex items-center gap-1">
                      <strong>Due:</strong> {formatDate(assignment.dueDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <strong>Points:</strong> {assignment.points}
                    </span>
                  </div>
                  
                  {assignment.hasSubmitted && assignment.submissions[0]?.feedback && (
                    <div className="mt-3 p-3 bg-richblack-700 rounded-md">
                      <p className="text-sm text-richblack-300">
                        <strong>Feedback:</strong> {assignment.submissions[0].feedback}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/dashboard/assignment/${assignment._id}`)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-richblack-900 rounded-md hover:bg-yellow-100 transition-all"
                  >
                    <MdOutlineRemoveRedEye size={16} />
                    View
                  </button>
                  
                  {!assignment.hasSubmitted && new Date() <= new Date(assignment.dueDate) && (
                    <button
                      onClick={() => navigate(`/dashboard/submit-assignment/${assignment._id}`)}
                      className="px-4 py-2 bg-caribbeangreen-400 text-richblack-900 rounded-md hover:bg-caribbeangreen-500 transition-all"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default StudentAssignments