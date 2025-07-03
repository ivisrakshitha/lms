<template>
    <section class="my-32">
      <div class="flex flex-col items-center gap-8 text-center">
        <!-- Heading -->
        <div class="text-3xl lg:text-4xl font-semibold">
          <span class="text-richblack-900">Your Swiss Knife for</span>
          <span class="gradient-text"> learning any language</span>
        </div>
  
        <!-- Description -->
        <p class="text-richblack-600 text-base font-medium max-w-3xl mx-auto">
          Using spin making learning multiple languages easy. With 20+ languages realistic voice-over, 
          progress tracking, custom schedule and more.
        </p>
  
        <!-- Images -->
        <div class="flex flex-col lg:flex-row items-center justify-center mt-8 relative">
          <img 
            src="/images/know-your-progress.png" 
            alt="Know Your Progress" 
            class="lg:-mr-32 mb-4 lg:mb-0 max-w-full h-auto"
          />
          <img 
            src="/images/compare-with-others.png" 
            alt="Compare With Others" 
            class="mb-4 lg:mb-0 max-w-full h-auto z-10"
          />
          <img 
            src="/images/plan-your-lessons.png" 
            alt="Plan Your Lessons" 
            class="lg:-ml-36 max-w-full h-auto"
          />
        </div>
  
        <!-- CTA Button -->
        <div class="mt-12">
          <BaseButton to="/signup" variant="primary" size="lg">
            Learn More
          </BaseButton>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import BaseButton from '@/components/common/BaseButton.vue'
  
  export default {
    name: 'LearningLanguageSection',
    components: {
      BaseButton
    }
  }
  </script>