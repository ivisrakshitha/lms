<template>
  <nav class="text-sm text-gray-500 mb-4">
    <ol class="flex items-center space-x-2">
      <template v-for="(crumb, index) in breadcrumbs" :key="index">
        <li v-if="index !== 0" class="flex items-center space-x-2">
          <span>/</span>
          <router-link :to="crumb.path" class="hover:underline text-primary">
            {{ crumb.label }}
          </router-link>
        </li>
      </template>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbs = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  return segments.map((segment, index) => ({
    label: segment.charAt(0).toUpperCase() + segment.slice(1),
    path: '/' + segments.slice(0, index + 1).join('/'),
  }))
})
</script>
