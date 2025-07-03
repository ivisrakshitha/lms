const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
    meta: {
      layout: 'DashboardLayout',
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/dashboard/Profile.vue'),
    meta: {
      layout: 'DashboardLayout',
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/dashboard/Settings.vue'),
    meta: {
      layout: 'DashboardLayout',
      requiresAuth: true
    }
  }
];

export default dashboardRoutes;