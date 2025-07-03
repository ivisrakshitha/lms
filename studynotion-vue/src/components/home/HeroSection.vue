<template>
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img 
          :src="currentBackgroundImage" 
          alt="Background" 
          class="w-full h-full object-cover opacity-30"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-richblack-900 via-richblack-900/70 to-richblack-900/30"></div>
      </div>
  
      <!-- Content -->
      <div class="relative z-10 w-11/12 max-w-maxContent mx-auto text-center text-white">
        <!-- Become Instructor Link -->
        <router-link to="/signup" class="group inline-block mb-8">
          <div class="bg-richblack-800 rounded-full p-1 font-bold text-richblack-200 transition-all duration-200 hover:scale-95">
            <div class="flex items-center gap-2 rounded-full px-10 py-2 transition-all duration-200 group-hover:bg-richblack-900">
              <span>Become an Instructor</span>
              <ArrowRightIcon class="w-4 h-4" />
            </div>
          </div>
        </router-link>
  
        <!-- Main Heading -->
        <div class="text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
          <h1>
            Empower Your Future with
            <span class="gradient-text font-bold"> Coding Skills</span>
          </h1>
        </div>
  
        <!-- Subtitle -->
        <p class="text-lg font-medium text-richblack-300 max-w-4xl mx-auto mb-12 leading-relaxed">
          With our online coding courses, you can learn at your own pace, from anywhere in the world, 
          and get access to a wealth of resources, including hands-on projects, quizzes, and personalized 
          feedback from instructors.
        </p>
  
        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <BaseButton to="/signup" variant="primary" size="lg" class="min-w-[180px]">
            Learn More
          </BaseButton>
          <BaseButton to="/login" variant="outline" size="lg" class="min-w-[180px]">
            Book a Demo
          </BaseButton>
        </div>
      </div>
  
      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDownIcon class="w-6 h-6 text-richblack-300" />
      </div>
    </section>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { ArrowRightIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
  import BaseButton from '@/components/common/BaseButton.vue'
  
  export default {
    name: 'HeroSection',
    components: {
      BaseButton,
      ArrowRightIcon,
      ChevronDownIcon
    },
    setup() {
      const currentBackgroundImage = ref('')
      
      const backgroundImages = [
        '/images/coding-bg-1.jpg',
        '/images/coding-bg-2.jpg',
        '/images/coding-bg-3.jpg',
        '/images/coding-bg-4.jpg'
      ]
  
      onMounted(() => {
        // Set random background image
        const randomIndex = Math.floor(Math.random() * backgroundImages.length)
        currentBackgroundImage.value = backgroundImages[randomIndex]
      })
  
      return {
        currentBackgroundImage
      }
    }
  }
  </script>