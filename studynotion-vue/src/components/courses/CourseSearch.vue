<template>
  <div class="w-full md:w-96">
    <input
      type="text"
      v-model="search"
      placeholder="Search courses..."
      class="w-full p-2 rounded bg-richblack-800 text-white border border-richblack-600 focus:outline-none"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['search'])

const search = ref('')

// Debounce search input
let debounceTimer
watch(search, (newVal) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emit('search', newVal)
  }, 300) // debounce delay in ms
})
</script>

<style scoped>
/* Optional: Add scoped styles if needed */
</style>
