<template>
  <div class="space-y-6">
    <!-- 🔍 Search Input -->
    <CourseSearch @search="onSearch" />

    <!-- 🟦 Filtered Courses Grid -->
    <div
      v-if="filteredCourses.length"
      class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <CourseCard
        v-for="course in filteredCourses"
        :key="course._id"
        :course="course"
        :progress="progressMap?.[course._id] || 0"
      />
    </div>

    <!-- 🚫 Empty State -->
    <div v-else class="text-center py-20 text-richblack-300">
      <svg
        class="mx-auto mb-4 w-12 h-12 text-richblack-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9.75 9.75L14.25 14.25M14.25 9.75L9.75 14.25"
        />
      </svg>
      <p class="text-lg">No courses found for your search.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CourseCard from './CourseCard.vue'
import CourseSearch from './CourseSearch.vue'

const props = defineProps({
  courses: {
    type: Array,
    required: true
  },
  progressMap: {
    type: Object,
    default: () => ({})
  }
})

const query = ref('')

// 🔍 Handle search input from child
function onSearch(val) {
  query.value = val
}

// 📦 Computed: Filter courses by search query
const filteredCourses = computed(() => {
  if (!query.value) return props.courses
  return props.courses.filter(course =>
    course.name.toLowerCase().includes(query.value.toLowerCase())
  )
})
</script>
