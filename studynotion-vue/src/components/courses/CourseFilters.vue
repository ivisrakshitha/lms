<template>
  <div class="flex flex-col sm:flex-row sm:items-center gap-2">
    <label for="category" class="text-sm font-medium text-white">Filter by Category:</label>

    <select
      id="category"
      v-model="selected"
      @change="emit('filter', selected)"
      class="bg-richblack-700 text-white text-sm rounded-md px-4 py-2 border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
    >
      <option value="">All</option>
      <option
        v-for="cat in categories"
        :key="cat"
        :value="cat"
      >
        {{ cat }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Props
defineProps({
  categories: {
    type: Array,
    default: () => []
  }
})

// Emits
const emit = defineEmits(['filter'])

// Reactive selected value
const selected = ref('')
</script>

<style scoped>
/* Add additional responsive or hover styles if desired */
</style>
