<template>
    <div class="min-h-screen bg-richblack-900">
      <!-- Hero Section -->
      <HeroSection />
  
      <!-- Code Blocks Section -->
      <div class="relative w-11/12 max-w-maxContent mx-auto">
        <!-- Code Block 1 -->
        <CodeBlocks
          position="lg:flex-row"
          :cta-btn1="{
            btnText: 'Try it Yourself',
            link: '/signup',
            active: true
          }"
          :cta-btn2="{
            btnText: 'Learn More',
            link: '/login',
            active: false
          }"
          :codeblock="codeBlock1"
          background-gradient="code-block-gradient"
          code-color="text-yellow-25"
        >
          <template #heading>
            <span class="text-white">Unlock Your </span>
            <span class="gradient-text">coding potential </span>
            <span class="text-white">with our online courses</span>
          </template>
          <template #subheading>
            Our courses are designed and taught by industry experts who have years of experience 
            in coding and are passionate about sharing their knowledge with you.
          </template>
        </CodeBlocks>
  
        <!-- Code Block 2 -->
        <CodeBlocks
          position="lg:flex-row-reverse"
          :cta-btn1="{
            btnText: 'Continue Lesson',
            link: '/signup',
            active: true
          }"
          :cta-btn2="{
            btnText: 'Learn More',
            link: '/login',
            active: false
          }"
          :codeblock="codeBlock2"
          background-gradient="code-block-gradient-2"
          code-color="text-white"
        >
          <template #heading>
            <span class="text-white">Start </span>
            <span class="gradient-text">coding in seconds</span>
          </template>
          <template #subheading>
            Go ahead, give it a try. Our hands-on learning environment means you'll be writing 
            real code from your very first lesson.
          </template>
        </CodeBlocks>
  
        <!-- Explore More Section -->
        <ExploreMore />
      </div>
  
      <!-- Section 2 - Skills and Learning -->
      <div class="bg-pure-greys-5 text-richblack-700 py-20">
        <!-- Background Section -->
          <div class="bg-center bg-cover h-80 flex items-center justify-center">
          <div class="w-11/12 max-w-maxContent mx-auto flex flex-col items-center gap-8">
            <div class="h-32"></div>
            <div class="flex flex-col sm:flex-row gap-7 text-white">
              <BaseButton to="/signup" variant="primary" class="flex items-center gap-3">
                Explore Full Catalog
                <ArrowRightIcon class="w-4 h-4" />
              </BaseButton>
              <BaseButton to="/signup" variant="outline">
                Learn More
              </BaseButton>
            </div>
          </div>
        </div>
  
        <!-- Skills Section -->
        <div class="w-11/12 max-w-maxContent mx-auto mt-20">
          <div class="flex flex-col lg:flex-row gap-10 mb-20">
            <div class="lg:w-1/2">
              <h2 class="text-3xl lg:text-4xl font-semibold mb-6">
                Get the Skills you need for a
                <span class="gradient-text"> Job that is in demand</span>
              </h2>
            </div>
            <div class="lg:w-1/2 flex flex-col gap-10">
              <p class="text-base leading-relaxed">
                The modern StudyNotion is the dictates its own terms. Today, to be a competitive 
                specialist requires more than professional skills.
              </p>
              <BaseButton to="/signup" variant="primary" class="w-fit">
                Learn More
              </BaseButton>
            </div>
          </div>
  
          <!-- Timeline Section -->
          <TimelineSection />
  
          <!-- Learning Language Section -->
          <LearningLanguageSection />
        </div>
      </div>
  
      <!-- Section 3 - Instructor -->
      <div class="w-11/12 max-w-maxContent mx-auto bg-richblack-900 text-white py-20">
        <InstructorSection />
  
        <!-- Reviews Section -->
        <div class="text-center mt-20">
          <h2 class="text-3xl lg:text-4xl font-semibold mb-4 flex items-center justify-center gap-3">
            Reviews from other learners
            <StarIcon class="w-8 h-8 text-yellow-50" />
          </h2>
          <!-- Reviews Slider Component will go here -->
          <div class="mt-12 text-richblack-300">
            <p>Student reviews and testimonials will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ArrowRightIcon, StarIcon } from '@heroicons/vue/24/outline'
  import BaseButton from '@/components/common/BaseButton.vue'
  import HeroSection from '@/components/home/HeroSection.vue'
  import CodeBlocks from '@/components/home/CodeBlocks.vue'
  import TimelineSection from '@/components/home/TimelineSection.vue'
  import LearningLanguageSection from '@/components/home/LearningLanguageSection.vue'
  import InstructorSection from '@/components/home/InstructorSection.vue'
  import ExploreMore from '@/components/home/ExploreMore.vue'
  
  export default {
    name: 'HomePage',
    components: {
      BaseButton,
      HeroSection,
      CodeBlocks,
      TimelineSection,
      LearningLanguageSection,
      InstructorSection,
      ExploreMore,
      ArrowRightIcon,
      StarIcon
    },
    setup() {
      const codeBlock1 = `<!DOCTYPE html>
  <html>
  <head><title>Example</title>
  </head>
  <body>
  <h1><a href="/">Header</a>
  </h1>
  <nav><a href="one/">One</a>
  <a href="two/">Two</a>
  <a href="three/">Three</a>
  </nav>`
  
      const codeBlock2 = `import React from "react";
  import CTAButton from "./Button";
  import TypeAnimation from "react-type";
  import { FaArrowRight } from "react-icons/fa";
  
  const Home = () => {
  return (
  <div>Home</div>
  )
  }
  export default Home;`
  
      return {
        codeBlock1,
        codeBlock2
      }
    }
  }
  </script>