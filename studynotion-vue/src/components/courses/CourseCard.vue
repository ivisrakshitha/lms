<!-- src/components/courses/CourseCard.vue -->
<template>
  <div
    class="bg-richblack-800 hover:bg-richblack-700 transition duration-300 rounded-lg p-5 shadow-lg flex flex-col justify-between h-full"
  >
    <!-- Course Title -->
    <h3 class="text-xl font-semibold text-yellow-50 mb-2">
      {{ course.courseName || 'Untitled Course' }}
    </h3>

    <!-- Course Description -->
    <p class="text-sm text-richblack-300 mb-4 flex-grow line-clamp-3">
      {{ course.description || 'No description available for this course.' }}
    </p>

    <!-- Category + Link -->
    <div class="mt-auto pt-3 border-t border-richblack-700 flex items-center justify-between text-sm text-yellow-400">
      <span>
        Category: {{ course.category?.name || 'Uncategorized' }}
      </span>

      <!-- Optional: link to course details page -->
      <router-link
        :to="`/courses/${course.id}`"
        class="text-blue-400 hover:underline transition"
      >
        View →
      </router-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  course: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
/* Truncate after 3 lines */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
