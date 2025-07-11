// src/router/routes/auth.js
const authRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      layout: 'AuthLayout',
      requiresAuth: false,
      onlyGuest: true
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/auth/Signup.vue'),
    meta: {
      layout: 'AuthLayout',
      requiresAuth: false,
      onlyGuest: true
    }
  },
  // In your router file
{
  path: '/forgot-password',
  name: 'ForgotPassword',
  component: () => import('@/views/auth/ForgotPassword.vue'),
},
{
  path: '/verify-otp',
  name: 'VerifyOTP',
  component: () => import('@/views/auth/VerifyOTP.vue'),
},
{
  path: '/reset-password',
  name: 'ResetPassword',
  component: () => import('@/views/auth/ResetPassword.vue'),
}
];

export default authRoutes;