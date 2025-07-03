<template>
    <section class="my-20">
      <div class="flex flex-col lg:flex-row items-center gap-20">
        <!-- Image -->
        <div class="lg:w-1/2 order-2 lg:order-1">
          <img 
            src="/images/instructor.png" 
            alt="Become an Instructor" 
            class="w-full h-auto rounded-3xl shadow-2xl"
          />
        </div>
  
        <!-- Content -->
        <div class="lg:w-1/2 order-1 lg:order-2">
          <div class="text-3xl lg:text-4xl font-semibold mb-4">
            <span class="text-white">Become an</span>
            <span class="gradient-text"> Instructor</span>
          </div>
  
          <p class="text-richblack-300 font-medium text-lg mb-12 leading-relaxed">
            Instructors from around the world teach millions of students on StudyNotion. 
            We provide the tools and skills to teach what you love.
          </p>
  
          <BaseButton to="/signup" variant="primary" size="lg" class="flex items-center gap-3">
            Start Teaching Today
            <ArrowRightIcon class="w-5 h-5" />
          </BaseButton>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import { ArrowRightIcon } from '@heroicons/vue/24/outline'
  import BaseButton from '@/components/common/BaseButton.vue'
  
  export default {
    name: 'InstructorSection',
    components: {
      BaseButton,
      ArrowRightIcon
    }
  }
  </script>