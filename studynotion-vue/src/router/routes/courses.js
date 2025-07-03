const routes = [
  {
    path: '/courses',
    name: 'Courses',
    component: () => import('@/views/courses/CoursesList.vue')
  }
];

export default routes;