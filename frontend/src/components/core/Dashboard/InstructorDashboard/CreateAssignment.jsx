// ========================================
// components/core/Dashboard/InstructorAssignments/CreateAssignment.jsx
// ========================================

import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createAssignment } from "../../../../services/operations/assignmentAPI"
import { getAllCourses } from "../../../../services/operations/courseDetailsAPI"
import IconBtn from "../../../common/IconBtn"
import { MdNavigateNext } from "react-icons/md"

const CreateAssignment = () => {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(false)
  const [courses, setCourses] = useState([])
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await getAllCourses()
        // Filter courses where current user is instructor
        const instructorCourses = result?.filter(
          (course) => course.instructor._id === user._id
        )
        setCourses(instructorCourses || [])
      } catch (error) {
        console.error("Error fetching courses:", error)
      }
    }
    
    fetchCourses()
  }, [user])

  const onSubmit = async (data) => {
    setLoading(true)
    
    const assignmentData = {
      ...data,
      points: parseInt(data.points),
      dueDate: new Date(data.dueDate).toISOString(),
    }
    
    const result = await createAssignment(assignmentData, token)
    
    if (result) {
      reset()
      navigate("/dashboard/instructor-assignments")
    }
    
    setLoading(false)
  }

  return (
    <div className="flex w-full items-start gap-x-6">
      <div className="flex flex-1 flex-col">
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">
          Create Assignment
        </h1>
        
        <div className="my-6 border-b-[1px] border-b-richblack-600 pb-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Assignment Title */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-richblack-5" htmlFor="title">
                Assignment Title <sup className="text-pink-200">*</sup>
              </label>
              <input
                id="title"
                placeholder="Enter Assignment Title"
                {...register("title", { required: "Assignment title is required" })}
                className="form-style w-full"
              />
              {errors.title && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  {errors.title.message}
                </span>
              )}
            </div>

            {/* Assignment Description */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-richblack-5" htmlFor="description">
                Assignment Description <sup className="text-pink-200">*</sup>
              </label>
              <textarea
                id="description"
                placeholder="Enter Assignment Description"
                {...register("description", { required: "Assignment description is required" })}
                className="form-style resize-x-none min-h-[130px] w-full"
              />
              {errors.description && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* Course Selection */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-richblack-5" htmlFor="courseId">
                Select Course <sup className="text-pink-200">*</sup>
              </label>
              <select
                {...register("courseId", { required: "Please select a course" })}
                className="form-style w-full"
              >
                <option value="">Choose a Course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.courseName}
                  </option>
                ))}
              </select>
              {errors.courseId && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  {errors.courseId.message}
                </span>
              )}
            </div>

            {/* Due Date and Points */}
            <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-6">
              <div className="flex w-full flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="dueDate">
                  Due Date <sup className="text-pink-200">*</sup>
                </label>
                <input
                  type="datetime-local"
                  id="dueDate"
                  {...register("dueDate", { required: "Due date is required" })}
                  className="form-style w-full"
                />
                {errors.dueDate && (
                  <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {errors.dueDate.message}
                  </span>
                )}
              </div>
              
              <div className="flex w-full flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="points">
                  Total Points <sup className="text-pink-200">*</sup>
                </label>
                <input
                  type="number"
                  id="points"
                  placeholder="Enter total points"
                  {...register("points", { 
                    required: "Points are required",
                    min: { value: 1, message: "Points must be at least 1" }
                  })}
                  className="form-style w-full"
                />
                {errors.points && (
                  <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {errors.points.message}
                  </span>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-richblack-5" htmlFor="instructions">
                Instructions <sup className="text-pink-200">*</sup>
              </label>
              <textarea
                id="instructions"
                placeholder="Enter detailed instructions for the assignment"
                {...register("instructions", { required: "Instructions are required" })}
                className="form-style resize-x-none min-h-[130px] w-full"
              />
              {errors.instructions && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  {errors.instructions.message}
                </span>
              )}
            </div>

            {/* Submission Type */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-richblack-5" htmlFor="submissionType">
                Submission Type <sup className="text-pink-200">*</sup>
              </label>
              <select
                {...register("submissionType", { required: "Please select submission type" })}
                className="form-style w-full"
              >
                <option value="">Choose Submission Type</option>
                <option value="text">Text Submission</option>
                <option value="file">File Upload</option>
                <option value="link">Link Submission</option>
              </select>
              {errors.submissionType && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  {errors.submissionType.message}
                </span>
              )}
            </div>

            {/* Resources (Optional) */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-richblack-5" htmlFor="resources">
                Additional Resources (Optional)
              </label>
              <textarea
                id="resources"
                placeholder="Add any additional resources or links"
                {...register("resources")}
                className="form-style resize-x-none min-h-[100px] w-full"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-x-2">
              <button
                onClick={() => navigate("/dashboard/instructor-assignments")}
                type="button"
                className="cursor-pointer rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
              >
                Cancel
              </button>
              <IconBtn
                type="submit"
                disabled={loading}
                text={loading ? "Creating..." : "Create Assignment"}
              >
                <MdNavigateNext />
              </IconBtn>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateAssignment
