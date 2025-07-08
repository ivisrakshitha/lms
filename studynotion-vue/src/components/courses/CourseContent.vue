<template>
  <div class="course-content p-6 max-w-4xl mx-auto text-white space-y-6">
    <!-- 📘 Course Title -->
    <h2 class="text-2xl font-bold">{{ course.title }}</h2>

    <!-- 🔍 Filter Dropdown -->
    <CourseFilters
      :categories="sectionTitles"
      @filter="onFilter"
    />

    <!-- 📊 Progress Bar -->
    <div class="w-full bg-richblack-600 h-4 rounded overflow-hidden mt-4">
      <div
        class="bg-yellow-500 h-full transition-all duration-300"
        :style="{ width: completionPercent + '%' }"
      ></div>
    </div>
    <p class="text-sm text-right text-yellow-300">{{ completionPercent }}% completed</p>

    <!-- 📚 Course Sections -->
    <div
      v-for="section in filteredSections"
      :key="section._id"
      class="mb-6"
    >
      <h3 class="text-xl font-semibold mb-2">{{ section.title }}</h3>

      <ul class="space-y-2">
        <li
          v-for="sub in section.subSection"
          :key="sub._id"
          class="flex items-center justify-between bg-richblack-800 p-3 rounded"
        >
          <span>{{ sub.title }}</span>

          <template v-if="completedVideos.has(sub._id)">
            <span class="text-green-400 font-medium">✅ Completed</span>
          </template>
          <template v-else>
            <button
              :disabled="loadingSet.has(sub._id)"
              @click="markCompleted(sub._id)"
              class="px-4 py-1 text-sm rounded text-white flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600"
              :class="loadingSet.has(sub._id) ? 'opacity-70 cursor-wait' : ''"
            >
              <span v-if="loadingSet.has(sub._id)">...</span>
              <span>Mark Completed</span>
            </button>
          </template>
        </li>
      </ul>
    </div>

    <!-- ❌ No Sections Found -->
    <div v-if="!filteredSections.length" class="text-center text-richblack-300 py-10">
      <p>No matching sections found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import axios from 'axios'
import CourseFilters from './CourseFilters.vue'

// Props
const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
})

// State
const selectedFilter = ref('')
const completedVideos = reactive(new Set())
const loadingSet = reactive(new Set())

// 🧠 Section titles for filter dropdown
const sectionTitles = computed(() => {
  return props.course.courseContent.map(section => section.title)
})

// 💡 Filtered sections
const filteredSections = computed(() => {
  if (!selectedFilter.value) return props.course.courseContent
  return props.course.courseContent.filter(
    section => section.title === selectedFilter.value
  )
})

// 📈 Completion Progress
const totalLectures = computed(() =>
  props.course.courseContent.reduce((acc, section) => acc + section.subSection.length, 0)
)

const completedCount = computed(() => completedVideos.size)

const completionPercent = computed(() =>
  totalLectures.value > 0 ? Math.round((completedCount.value / totalLectures.value) * 100) : 0
)

// 🔁 Handle filter
function onFilter(val) {
  selectedFilter.value = val
}

// ✅ Mark subsection as completed
async function markCompleted(subsectionId) {
  if (completedVideos.has(subsectionId)) return
  try {
    loadingSet.add(subsectionId)
    await axios.post('/api/progress/update', {
      courseId: props.course._id,
      subsectionId,
    })
    completedVideos.add(subsectionId)
  } catch (err) {
    console.error('Error marking complete:', err)
  } finally {
    loadingSet.delete(subsectionId)
  }
}

// 📦 Load existing progress on mount
onMounted(async () => {
  try {
    const { data } = await axios.get(`/api/progress/${props.course._id}`)
    if (Array.isArray(data.completedVideos)) {
      data.completedVideos.forEach(id => completedVideos.add(id))
    }
  } catch (err) {
    console.warn('No progress data found')
  }
})
</script>

<style scoped>
/* Add styles as needed */
</style>
