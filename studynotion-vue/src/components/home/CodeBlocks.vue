<template>
    <section class="my-20">
      <div :class="['flex', position, 'justify-between', 'flex-col', 'lg:gap-10', 'gap-10']">
        <!-- Text Section -->
        <div class="w-full lg:w-1/2 flex flex-col gap-8">
          <div class="text-3xl lg:text-4xl font-semibold text-richblack-5">
            <slot name="heading"></slot>
          </div>
          
          <div class="text-richblack-300 text-base font-medium -mt-3">
            <slot name="subheading"></slot>
          </div>
  
          <!-- Buttons -->
          <div class="flex gap-7 mt-7">
            <BaseButton 
              :to="ctaBtn1.link" 
              :variant="ctaBtn1.active ? 'primary' : 'outline'"
              class="flex items-center gap-2"
            >
              {{ ctaBtn1.btnText }}
              <ArrowRightIcon class="w-4 h-4" />
            </BaseButton>
            
            <BaseButton 
              :to="ctaBtn2.link" 
              :variant="ctaBtn2.active ? 'primary' : 'outline'"
            >
              {{ ctaBtn2.btnText }}
            </BaseButton>
          </div>
        </div>
  
        <!-- Code Section -->
        <div class="relative w-full lg:w-[470px]">
          <!-- Background Gradient -->
          <div :class="backgroundGradient" class="absolute inset-0"></div>
          
          <!-- Code Container -->
          <div class="relative border border-richblack-700 rounded-xl flex py-4 text-xs sm:text-sm leading-6 bg-richblack-900/50 backdrop-blur-sm">
            <!-- Line Numbers -->
            <div class="flex flex-col w-[10%] text-center text-richblack-400 font-inter font-bold select-none px-2">
              <span v-for="n in 11" :key="n" class="leading-6">{{ n }}</span>
            </div>
  
            <!-- Code Content -->
            <div :class="['w-[90%] flex flex-col gap-2 font-bold font-mono pr-2', codeColor]">
              <TypeWriter 
                :text="codeblock" 
                :type-speed="50"
                :start-delay="500"
                class="whitespace-pre-line"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import { ArrowRightIcon } from '@heroicons/vue/24/outline'
  import BaseButton from '@/components/common/BaseButton.vue'
  import TypeWriter from '@/components/ui/TypeWriter.vue'
  
  export default {
    name: 'CodeBlocks',
    components: {
      BaseButton,
      ArrowRightIcon,
      TypeWriter
    },
    props: {
      position: {
        type: String,
        default: 'lg:flex-row'
      },
      ctaBtn1: {
        type: Object,
        required: true
      },
      ctaBtn2: {
        type: Object,
        required: true
      },
      codeblock: {
        type: String,
        required: true
      },
      backgroundGradient: {
        type: String,
        default: 'code-block-gradient'
      },
      codeColor: {
        type: String,
        default: 'text-yellow-25'
      }
    }
  }
  </script>
  
  <style scoped>
  .code-block-gradient {
    background: linear-gradient(123.77deg, #8A2BE2 -6.46%, #FFA500 59.04%, #F8F8FF 124.53%);
    opacity: 0.2;
    filter: blur(34px);
  }
  
  .code-block-gradient-2 {
    background: linear-gradient(118.19deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%);
    opacity: 0.2;
    filter: blur(34px);
  }
  </style>