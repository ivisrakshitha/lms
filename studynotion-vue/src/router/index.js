import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/auth/Signup.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/dashboard/Dashboard.vue')
  },
  {
    path: '/courses',
    name: 'Courses',
    component: () => import('../views/courses/CoursesList.vue')
  },
  {
  path: '/forgot-password',
  name: 'ForgotPassword',
  component: () => import('@/views/auth/ForgotPassword.vue'),
},
{
  path: '/verify-otp',
  name: 'VerifyOTP',
  component: () => import('@/views/auth/VerifyOTP.vue'),
  props: (route) => ({ email: route.query.email, purpose: route.query.purpose })
},
{
  path: '/reset-password',
  name: 'ResetPassword',
  component: () => import('@/views/auth/ResetPassword.vue'),
  props: (route) => ({ email: route.query.email, otp: route.query.otp })
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
