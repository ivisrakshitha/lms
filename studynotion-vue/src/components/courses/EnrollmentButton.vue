<template>
  <button @click="enroll" class="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition">
    Enroll Now
  </button>
</template>
<script setup>
const props = defineProps({ courseId: String })
const enroll = async () => {
  await fetch(`/api/enroll/${props.courseId}`, { method: 'POST' })
  alert('Enrolled successfully!')
}
</script>