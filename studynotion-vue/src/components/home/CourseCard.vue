<template>
    <div 
      @click="$emit('select')"
      :class="[
        'cursor-pointer transition-all duration-300 hover:scale-105',
        'h-80 border-2 border-dashed border-richblack-400',
        isActive 
          ? 'bg-white shadow-[12px_12px_0_0] shadow-yellow-50 text-richblack-900' 
          : 'bg-richblack-800 text-richblack-25 hover:bg-richblack-700'
      ]"
    >
      <!-- Content -->
      <div class="p-6 h-4/5 flex flex-col justify-between">
        <div>
          <h3 :class="['text-xl font-semibold mb-4', isActive ? 'text-richblack-800' : 'text-richblack-5']">
            {{ course.heading }}
          </h3>
          <p :class="['text-sm leading-relaxed', isActive ? 'text-richblack-600' : 'text-richblack-400']">
            {{ course.description }}
          </p>
        </div>
      </div>
  
      <!-- Footer -->
      <div :class="['px-6 py-4 flex justify-between items-center text-sm font-medium', isActive ? 'text-blue-300' : 'text-richblack-300']">
        <div class="flex items-center gap-2">
          <UsersIcon class="w-4 h-4" />
          <span>{{ course.level }}</span>
        </div>
        <div class="flex items-center gap-2">
          <AcademicCapIcon class="w-4 h-4" />
          <span>{{ course.lessonNumber }} Lessons</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { UsersIcon, AcademicCapIcon } from '@heroicons/vue/24/outline'
  
  export default {
    name: 'CourseCard',
    components: {
      UsersIcon,
      AcademicCapIcon
    },
    props: {
      course: {
        type: Object,
        required: true
      },
      isActive: {
        type: Boolean,
        default: false
      }
    },
    emits: ['select']
  }
  </script>