// ========================================
// components/core/Dashboard/InstructorAssignments/InstructorAssignments.jsx
// ========================================

import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getInstructorAssignments, deleteAssignment } from "../../../../services/operations/assignmentAPI"
import { formatDate } from "../../../../services/formatDate"
import ConfirmationModal from "../../../common/ConfirmationModal"
import IconBtn from "../../../common/IconBtn"
import { FiEdit2, FiTrash2 } from "react-icons/fi"
import { HiOutlinePlusCircle } from "react-icons/hi"
import { MdOutlineRemoveRedEye } from "react-icons/md"

const InstructorAssignments = () => {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirmationModal, setConfirmationModal] = useState(null)

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true)
      const result = await getInstructorAssignments(token)
      if (result) {
        setAssignments(result)
      }
      setLoading(false)
    }
    
    fetchAssignments()
  }, [token])

  const handleDeleteAssignment = async (assignmentId) => {
    const result = await deleteAssignment(assignmentId, token)
    if (result) {
      setAssignments((prev) => prev.filter((assignment) => assignment._id !== assignmentId))
    }
    setConfirmationModal(null)
  }

  const getStatusColor = (dueDate) => {
    const now = new Date()
    const due = new Date(dueDate)
    const diffTime = due - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return "text-red-500"
    if (diffDays <= 3) return "text-yellow-500"
    return "text-green-500"
  }

  const getSubmissionStats = (submissions) => {
    const total = submissions.length
    const graded = submissions.filter(sub => sub.status === "graded").length
    const pending = total - graded
    return { total, graded, pending }
  }

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
        <IconBtn
          text="Create Assignment"
          onclick={() => navigate("/dashboard/create-assignment")}
        >
          <HiOutlinePlusCircle />
        </IconBtn>
      </div>

      {assignments?.length === 0 ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="text-center">
            <p className="text-2xl text-richblack-5">You have not created any assignments yet</p>
            <IconBtn
              text="Create Assignment"
              onclick={() => navigate("/dashboard/create-assignment")}
            >
              <HiOutlinePlusCircle />
            </IconBtn>
          </div>
        </div>
      ) : (
        <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800">
          <div className="flex rounded-t-md bg-richblack-700 ">
            <p className="flex-1 px-5 py-3 text-sm font-medium uppercase text-richblack-100">
              Assignment
            </p>
            <p className="px-2 py-3 text-sm font-medium uppercase text-richblack-100">
              Due Date
            </p>
            <p className="px-2 py-3 text-sm font-medium uppercase text-richblack-100">
              Points
            </p>
            <p className="px-2 py-3 text-sm font-medium uppercase text-richblack-100">
              Submissions
            </p>
            <p className="flex-1 px-5 py-3 text-sm font-medium uppercase text-richblack-100">
              Actions
            </p>
          </div>

          {assignments.map((assignment) => {
            const stats = getSubmissionStats(assignment.submissions)
            return (
              <div
                key={assignment._id}
                className="flex items-center border-b border-richblack-700 px-5 py-8"
              >
                <div className="flex flex-1 cursor-pointer items-center gap-4">
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold text-richblack-5">
                      {assignment.title}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {assignment.course.courseName}
                    </p>
                    <p className="text-xs text-richblack-300 mt-1">
                      Created: {formatDate(assignment.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="px-2 py-3">
                  <p className={`text-sm font-medium ${getStatusColor(assignment.dueDate)}`}>
                    {formatDate(assignment.dueDate)}
                  </p>
                </div>

                <div className="px-2 py-3">
                  <p className="text-sm font-medium text-richblack-100">
                    {assignment.points}
                  </p>
                </div>

                <div className="px-2 py-3">
                  <div className="text-xs text-richblack-300">
                    <p>Total: {stats.total}</p>
                    <p>Graded: {stats.graded}</p>
                    <p>Pending: {stats.pending}</p>
                  </div>
                </div>

                <div className="flex gap-x-1 px-5">
                  <button
                    title="View"
                    onClick={() => navigate(`/dashboard/assignment/${assignment._id}`)}
                    className="px-2 py-1 text-richblack-300 hover:text-caribbeangreen-300"
                  >
                    <MdOutlineRemoveRedEye size={20} />
                  </button>
                  <button
                    title="Edit"
                    onClick={() => navigate(`/dashboard/edit-assignment/${assignment._id}`)}
                    className="px-2 py-1 text-richblack-300 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    title="Delete"
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Do you want to delete this assignment?",
                        text2: "All the data related to this assignment will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDeleteAssignment(assignment._id),
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }
                    className="px-2 py-1 text-richblack-300 hover:text-[#ff0000]"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default InstructorAssignments