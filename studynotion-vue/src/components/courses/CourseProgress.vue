<template>
  <div class="w-full bg-gray-200 rounded-full h-4">
    <div class="bg-green-500 h-4 rounded-full text-xs text-white text-center" :style="{ width: progress + '%' }">
      {{ progress }}%
    </div>
  </div>
</template>
<script setup>
defineProps({ progress: Number })
</script>
