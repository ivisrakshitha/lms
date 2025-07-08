<template>
  <div>
    <button @click="open = true" class="text-blue-600 underline">Add Review</button>
    <div v-if="open" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded shadow w-full max-w-md">
        <textarea v-model="comment" class="border w-full p-2 rounded" placeholder="Write your review..."></textarea>
        <div class="flex justify-end mt-2">
          <button @click="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
          <button @click="open = false" class="ml-2 text-gray-700">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({ courseId: String })
const emit = defineEmits(['review-added'])
const comment = ref('')
const open = ref(false)
const submit = async () => {
  await fetch(`/api/reviews/${props.courseId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ comment: comment.value })
  })
  open.value = false
  comment.value = ''
  emit('review-added')
}
</script>
