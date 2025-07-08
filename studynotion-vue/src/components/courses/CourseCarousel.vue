<template>
  <div class="relative w-full">
    <!-- Carousel container -->
    <div
      ref="carousel"
      class="flex overflow-x-auto scrollbar-hide scroll-smooth gap-4 py-4"
      @wheel.prevent="onWheel"
    >
      <div
        v-for="course in courses"
        :key="course.id"
        class="min-w-[250px] flex-shrink-0 bg-richblack-800 rounded-md p-4 text-white"
      >
        <img :src="course.image" :alt="course.title" class="w-full h-40 object-cover rounded-md mb-2" />
        <h3 class="text-lg font-semibold">{{ course.title }}</h3>
        <p class="text-sm text-richblack-400">Instructor: {{ course.instructor }}</p>
        <button class="mt-2 px-3 py-1 bg-yellow-500 text-richblack-900 rounded hover:bg-yellow-600">
          Enroll Now
        </button>
      </div>
    </div>

    <!-- Left Arrow -->
    <button
      class="absolute top-1/2 -left-2 transform -translate-y-1/2 bg-richblack-700 p-2 rounded-full hover:bg-richblack-600 text-white"
      @click="scrollLeft"
      aria-label="Scroll Left"
    >
      ‹
    </button>

    <!-- Right Arrow -->
    <button
      class="absolute top-1/2 -right-2 transform -translate-y-1/2 bg-richblack-700 p-2 rounded-full hover:bg-richblack-600 text-white"
      @click="scrollRight"
      aria-label="Scroll Right"
    >
      ›
    </button>
  </div>
</template>

<script>
export default {
  name: "CourseCarousel",
  props: {
    courses: {
      type: Array,
      required: true,
    },
  },
  methods: {
    scrollLeft() {
      this.$refs.carousel.scrollBy({ left: -300, behavior: "smooth" });
    },
    scrollRight() {
      this.$refs.carousel.scrollBy({ left: 300, behavior: "smooth" });
    },
    onWheel(event) {
      // Allow horizontal scroll with mouse wheel
      this.$refs.carousel.scrollLeft += event.deltaY;
    },
  },
};
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
