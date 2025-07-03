export const USER_ROLES = {
    STUDENT: 'Student',
    INSTRUCTOR: 'Instructor',
    ADMIN: 'Admin'
  }
  
  export const COURSE_STATUS = {
    DRAFT: 'Draft',
    PUBLISHED: 'Published'
  }
  
  export const ASSIGNMENT_STATUS = {
    NOT_SUBMITTED: 'not_submitted',
    SUBMITTED: 'submitted',
    GRADED: 'graded',
    OVERDUE: 'overdue'
  }
  
  export const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:4000/api/v1'
  
  export const API_ENDPOINTS = {
    AUTH: {
      LOGIN: '/auth/login',
      SIGNUP: '/auth/signup',
      SEND_OTP: '/auth/sendotp',
      RESET_PASSWORD_TOKEN: '/auth/reset-password-token',
      RESET_PASSWORD: '/auth/reset-password',
      CHANGE_PASSWORD: '/auth/changepassword'
    },
    COURSES: {
      GET_ALL: '/course/getAllCourses',
      GET_DETAILS: '/course/getCourseDetails',
      CREATE: '/course/createCourse',
      UPDATE: '/course/editCourse',
      DELETE: '/course/deleteCourse',
      GET_INSTRUCTOR_COURSES: '/course/getInstructorCourses',
      GET_CATEGORIES: '/course/showAllCategories'
    },
    ASSIGNMENTS: {
      CREATE: '/assignments/createAssignment',
      GET_INSTRUCTOR: '/assignments/instructor/assignments',
      GET_STUDENT: '/assignments/student/assignments',
      SUBMIT: '/assignments/assignment/:assignmentId/submit',
      GRADE: '/assignments/assignment/:assignmentId/submission/:submissionId/grade'
    },
    PROFILE: {
      GET_USER_DETAILS: '/profile/getUserDetails',
      UPDATE_PROFILE: '/profile/updateProfile',
      UPDATE_IMAGE: '/profile/updateUserProfileImage',
      GET_ENROLLED_COURSES: '/profile/getEnrolledCourses',
      DELETE_ACCOUNT: '/profile/deleteProfile'
    },
    PAYMENT: {
      CAPTURE: '/payment/capturePayment',
      VERIFY: '/payment/verifyPayment'
    }
  }
  
  export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    DASHBOARD: '/dashboard',
    COURSES: '/courses',
    CART: '/cart',
    PROFILE: '/dashboard/profile',
    SETTINGS: '/dashboard/settings'
  }
  
  export const STORAGE_KEYS = {
    TOKEN: 'studynotion_token',
    USER: 'studynotion_user',
    CART: 'studynotion_cart'
  }