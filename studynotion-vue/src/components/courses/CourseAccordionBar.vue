<script setup>
import { ref, watch, computed, onMounted, nextTick } from 'vue'
import CourseSubSectionAccordion from './CourseSubSectionAccordion.vue'
import { IoMdArrowDropdown } from 'vue-icons/io' // Assuming you use vue-icons or similar

const props = defineProps({
  course: Object,
  isActive: Array,
  handleActive: Function
})

const contentEl = ref(null)
const active = ref(false)
const sectionHeight = ref(0)

// Watch for isActive prop changes to set active state
watch(
  () => props.isActive,
  (newVal) => {
    active.value = newVal.includes(props.course._id)
  },
  { immediate: true }
)

// Watch for active changes to set height
watch(
  active,
  async (val) => {
    await nextTick()
    if (val && contentEl.value) {
      sectionHeight.value = contentEl.value.scrollHeight
    } else {
      sectionHeight.value = 0
    }
  }
)

function toggleActive() {
  props.handleActive(props.course._id)
}
</script>

<template>
  <div
    class="overflow-hidden border border-solid border-richblack-600 bg-richblack-700 hover:bg-richblack-600 text-richblack-5 last:mb-0 duration-200"
  >
    <div>
      <div
        class="flex cursor-pointer items-start justify-between bg-opacity-20 px-7 py-6 transition-[0.3s]"
        @click="toggleActive"
      >
        <div class="flex items-center gap-2">
          <i
            :class="active ? 'rotate-180 duration-300' : 'rotate-0 duration-300'"
          >
            <IoMdArrowDropdown size="25" />
          </i>
          <p>{{ course?.sectionName }}</p>
        </div>
        <div class="space-x-4">
          <span class="text-yellow-25">
            {{ course?.subSection?.length || 0 }} lecture(s)
          </span>
        </div>
      </div>
    </div>

    <div
      ref="contentEl"
      class="relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]"
      :style="{ height: sectionHeight + 'px' }"
    >
      <div class="text-textHead flex flex-col gap-2 px-7 py-6 font-semibold">
        <CourseSubSectionAccordion
          v-for="(subSec, i) in course?.subSection"
          :key="i"
          :subSec="subSec"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any scoped styles here if necessary */
</style>
