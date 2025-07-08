<!-- CourseSubSectionAccordion.vue -->
<script setup>
defineProps({
  subSec: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div
    class="rounded bg-richblack-800 px-4 py-3 text-sm text-white hover:bg-richblack-700 transition duration-200"
  >
    <p class="font-medium">{{ subSec.title }}</p>
    <p class="text-xs text-richblack-300 mt-1">{{ subSec.duration || '0 min' }}</p>
  </div>
</template>

<style scoped>
/* Optional custom style tweaks */
</style>
