<template>
  <div class="mt-6">
    <h2 class="text-xl font-semibold mb-2">Reviews</h2>
    <div v-for="review in reviews" :key="review._id" class="border p-3 rounded mb-2">
      <p class="font-bold">{{ review.user }}</p>
      <p class="text-gray-700">{{ review.comment }}</p>
    </div>
    <AddReviewModal :courseId="courseId" @review-added="fetchReviews" />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import AddReviewModal from './AddReviewModal.vue'
const props = defineProps({ courseId: String })
const reviews = ref([])
const fetchReviews = async () => {
  const res = await fetch(`/api/reviews/${props.courseId}`)
  reviews.value = await res.json()
}
onMounted(fetchReviews)
</script>
