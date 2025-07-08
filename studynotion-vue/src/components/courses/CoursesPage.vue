<template>
  <div class="courses-page">
    <h1>Explore Courses</h1>

    <CourseFilters />
    <CourseSearch />
    <CourseCarousel :courses="courses" />
    <CourseGrid :courses="courses" />
  </div>
</template>

<script>
import CourseFilters from './CourseFilters.vue';
import CourseSearch from './CourseSearch.vue';
import CourseCarousel from './CourseCarousel.vue';
import CourseGrid from './CourseGrid.vue';

export default {
  name: 'CoursesPage',
  components: {
    CourseFilters,
    CourseSearch,
    CourseCarousel,
    CourseGrid,
  },
  data() {
    return {
      courses: [
        {
          id: 1,
          title: 'Vue.js Basics',
          instructor: 'Jane Doe',
          image: 'https://via.placeholder.com/300x180',
        },
        {
          id: 2,
          title: 'Advanced Vue',
          instructor: 'John Smith',
          image: 'https://via.placeholder.com/300x180',
        },
      ],
    };
  },
};
</script>

<style scoped>
.courses-page {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}
</style>
