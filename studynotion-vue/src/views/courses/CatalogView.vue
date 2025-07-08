<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Courses</h1>

    <div class="flex flex-col md:flex-row md:items-center gap-4 mb-6">
      <CourseSearch @search="handleSearch" />
      <CourseFilters :categories="categories" @filter="handleFilter" />
    </div>

    <CourseGrid :courses="filteredCourses" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CourseGrid from '@/components/courses/CourseGrid.vue'
import CourseSearch from '@/components/courses/CourseSearch.vue'
import CourseFilters from '@/components/courses/CourseFilters.vue'

const courses = ref([])
const filteredCourses = ref([])
const categories = ref([])
const searchQuery = ref('')
const selectedCategory = ref('')

onMounted(async () => {
  const res = await fetch('/api/courses')
  const json = await res.json()
  courses.value = json.data
  filteredCourses.value = json.data
  categories.value = [...new Set(json.data.map(c => c.category?.name || 'Uncategorized'))]
})

function handleSearch(query) {
  searchQuery.value = query.toLowerCase()
  applyFilters()
}

function handleFilter(category) {
  selectedCategory.value = category
  applyFilters()
}

function applyFilters() {
  filteredCourses.value = courses.value.filter(course => {
    const matchesSearch = course.courseName.toLowerCase().includes(searchQuery.value)
    const matchesCategory = !selectedCategory.value || course.category?.name === selectedCategory.value
    return matchesSearch && matchesCategory
  })
}
</script>