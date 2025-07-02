<template>
    <section class="my-20">
      <div class="flex flex-col lg:flex-row gap-15 items-center">
        <!-- Timeline Items -->
        <div class="w-full lg:w-[45%] flex flex-col gap-8">
          <div 
            v-for="(item, index) in timelineData" 
            :key="index"
            class="flex items-start gap-6"
          >
            <!-- Icon -->
            <div class="w-12 h-12 rounded-full bg-richblue-500 flex items-center justify-center flex-shrink-0">
              <img :src="item.logo" :alt="item.heading" class="w-6 h-6" />
            </div>
            
            <!-- Content -->
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-richblack-800 mb-2">{{ item.heading }}</h3>
              <p class="text-richblack-700">{{ item.description }}</p>
            </div>
          </div>
        </div>
  
        <!-- Image Section -->
        <div class="relative lg:w-[55%] flex justify-center">
          <img 
            src="/images/timeline-image.png" 
            alt="Timeline" 
            class="max-w-full h-auto object-cover rounded-lg shadow-2xl"
          />
          
          <!-- Stats Overlay -->
          <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-caribbeangreen-700 rounded-2xl p-8 flex items-center justify-center">
            <div class="flex items-center gap-8 text-white">
              <div class="text-center border-r border-caribbeangreen-300 pr-8">
                <p class="text-3xl font-bold">10</p>
                <p class="text-caribbeangreen-300 text-sm uppercase tracking-wide">Years Experience</p>
              </div>
              <div class="text-center">
                <p class="text-3xl font-bold">250</p>
                <p class="text-caribbeangreen-300 text-sm uppercase tracking-wide">Types of Courses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'TimelineSection',
    setup() {
      const timelineData = [
        {
          logo: '/icons/leadership.svg',
          heading: 'Leadership',
          description: 'Fully committed to the success company'
        },
        {
          logo: '/icons/responsibility.svg',
          heading: 'Responsibility',
          description: 'Students will always be our top priority'
        },
        {
          logo: '/icons/flexibility.svg',
          heading: 'Flexibility',
          description: 'The ability to switch is an important skill'
        },
        {
          logo: '/icons/solve-problem.svg',
          heading: 'Solve the problem',
          description: 'Code your way to a solution'
        }
      ]
  
      return {
        timelineData
      }
    }
  }
  </script>