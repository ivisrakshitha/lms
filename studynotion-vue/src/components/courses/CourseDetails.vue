<template>
  <div class="p-6">
    <CourseContent :course="course" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import CourseContent from '@/components/courses/CourseContent.vue';

const route = useRoute();
const courseId = route.params.id;
const course = ref(null);

onMounted(() => {
  axios.get(`/api/courses/${courseId}`)
    .then(res => {
      course.value = res.data.data;
    })
    .catch(err => {
      console.error('Failed fetching course:', err);
    });
});
</script>
