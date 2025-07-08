<template>
  <div class="min-h-screen bg-richblack-900 text-white py-10 px-4 md:px-10">
    <div class="max-w-7xl mx-auto">
      <!-- Page Heading -->
      <h1 class="text-4xl font-bold mb-8 text-yellow-50">Explore Our Courses</h1>

      <!-- Search and Filter Section -->
      <div class="flex flex-col md:flex-row md:items-center gap-4 mb-10">
        <CourseSearch @search="handleSearch" />
        <CourseFilters :categories="categories" @filter="handleFilter" />
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <span class="text-lg text-richblack-300 animate-pulse">Loading courses...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20 text-red-400">
        {{ error }}
      </div>

      <!-- No Results -->
      <div v-else-if="filteredCourses.length === 0" class="text-center py-20 text-richblack-300">
        No courses found matching your criteria.
      </div>

      <!-- Course Grid -->
      <CourseGrid v-else :courses="filteredCourses" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CourseGrid from '@/components/courses/CourseGrid.vue'
import CourseSearch from '@/components/courses/CourseSearch.vue'
import CourseFilters from '@/components/courses/CourseFilters.vue'

// State
const courses = ref([])
const filteredCourses = ref([])
const categories = ref([])
const loading = ref(true)
const error = ref(null)

// Fetch courses
onMounted(async () => {
  try {
    const response = await fetch('/api/courses') // Make sure this matches your backend route
    const result = await response.json()

    if (!result?.data || !Array.isArray(result.data)) {
      throw new Error('No course data found.')
    }

    courses.value = result.data
    filteredCourses.value = result.data

    // Extract and deduplicate categories
    const extractedCategories = new Set(result.data.map(c => c.category?.name || 'Uncategorized'))
    categories.value = ['All', ...extractedCategories]
  } catch (err) {
    console.error(err)
    error.value = 'Failed to load courses. Please try again later.'
  } finally {
    loading.value = false
  }
})

// Search handler
function handleSearch(query) {
  const q = query.toLowerCase()
  filteredCourses.value = courses.value.filter(course =>
    course.courseName.toLowerCase().includes(q)
  )
}

// Filter handler
function handleFilter(category) {
  if (!category || category === 'All') {
    filteredCourses.value = courses.value
  } else {
    filteredCourses.value = courses.value.filter(
      course => course.category?.name === category
    )
  }
}
</script>

<style scoped>
/* Optional: Better spacing for filters and search */
input, select {
  background-color: #1c1c1c;
  color: white;
  border: 1px solid #333;
  padding: 8px 12px;
  border-radius: 4px;
}
</style>
