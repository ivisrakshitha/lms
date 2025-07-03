const publicRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      layout: 'DefaultLayout'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: {
      layout: 'DefaultLayout'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/Contact.vue'),
    meta: {
      layout: 'DefaultLayout'
    }
  },
  {
    path: '/courses',
    name: 'Courses',
    component: () => import('@/views/courses/CoursesList.vue'),
    meta: {
      layout: 'DefaultLayout'
    }
  }
];

export default publicRoutes;