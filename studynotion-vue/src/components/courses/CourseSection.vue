<template>
  <div class="p-6 max-w-3xl mx-auto">
    <FilterDropdown :categories="categories" @filter="onFilter" />

    <div class="space-y-3">
      <CourseAccordionBar
        v-for="course in filteredCourses"
        :key="course._id"
        :course="course"
        :isActive="activeSections"
        :handleActive="handleActive"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FilterDropdown from './FilterDropdown.vue'
import CourseAccordionBar from './CourseAccordionBar.vue'

// Mock courses with category field
const courses = ref([
  {
    _id: 'section1',
    sectionName: 'Introduction to Vue.js',
    category: 'Vue',
    subSection: [
      { title: 'What is Vue?', duration: '4 min' },
      { title: 'Setting up Vue', duration: '6 min' },
    ],
  },
  {
    _id: 'section2',
    sectionName: 'Advanced Concepts',
    category: 'Vue',
    subSection: [
      { title: 'Composition API', duration: '8 min' },
      { title: 'Reactivity system', duration: '7 min' },
    ],
  },
  {
    _id: 'section3',
    sectionName: 'React Basics',
    category: 'React',
    subSection: [
      { title: 'JSX & Components', duration: '5 min' },
      { title: 'State and Props', duration: '7 min' },
    ],
  },
])

// Extract unique categories
const categories = [...new Set(courses.value.map(c => c.category))]

const activeSections = ref([])
const selectedCategory = ref('')

function handleActive(id) {
  if (activeSections.value.includes(id)) {
    activeSections.value = activeSections.value.filter(i => i !== id)
  } else {
    activeSections.value.push(id)
  }
}

function onFilter(category) {
  selectedCategory.value = category
  activeSections.value = [] // close all when filter changes
}

const filteredCourses = computed(() => {
  if (!selectedCategory.value) return courses.value
  return courses.value.filter(c => c.category === selectedCategory.value)
})
</script>
