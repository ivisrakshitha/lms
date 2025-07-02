<template>
    <div class="my-12">
      <div class="relative overflow-hidden">
        <div 
          class="flex transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(-${currentSlide * slideWidth}%)` }"
        >
          <div 
            v-for="(review, index) in reviews" 
            :key="index"
            class="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4"
          >
            <div class="bg-richblack-800 rounded-xl p-6 h-48 flex flex-col justify-between">
              <!-- User Info -->
              <div class="flex items-center gap-4 mb-4">
                <img 
                  :src="review.user.image" 
                  :alt="review.user.name"
                  class="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 class="text-richblack-5 font-semibold">{{ review.user.name }}</h4>
                  <p class="text-richblack-400 text-sm">{{ review.course }}</p>
                </div>
              </div>
              
              <!-- Review Text -->
              <p class="text-richblack-25 text-sm leading-relaxed flex-1">
                {{ truncateText(review.review, 120) }}
              </p>
              
              <!-- Rating -->
              <div class="flex items-center gap-2 mt-4">
                <span class="text-yellow-100 font-semibold">{{ review.rating }}</span>
                <div class="flex">
                  <StarIcon 
                    v-for="i in 5" 
                    :key="i"
                    :class="[
                      'w-4 h-4',
                      i <= review.rating ? 'text-yellow-100 fill-current' : 'text-richblack-500'
                    ]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Navigation Dots -->
        <div class="flex justify-center mt-6 gap-2">
          <button
            v-for="(_, index) in totalSlides"
            :key="index"
            @click="goToSlide(index)"
            :class="[
              'w-3 h-3 rounded-full transition-colors duration-200',
              currentSlide === index ? 'bg-yellow-50' : 'bg-richblack-600'
            ]"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { StarIcon } from '@heroicons/vue/24/solid'
  
  export default {
    name: 'ReviewSlider',
    components: {
      StarIcon
    },
    setup() {
      const currentSlide = ref(0)
      const autoSlideInterval = ref(null)
      
      const reviews = ref([
        {
          user: {
            name: 'John Doe',
            image: 'https://via.placeholder.com/40'
          },
          course: 'React Development',
          review: 'Amazing course! The instructor explains complex concepts in a very simple way. I learned so much and feel confident about building React applications now.',
          rating: 5
        },
        {
          user: {
            name: 'Jane Smith',
            image: 'https://via.placeholder.com/40'
          },
          course: 'Python Programming',
          review: 'Best Python course I have taken. The projects are practical and help you understand real-world applications. Highly recommended!',
          rating: 5
        },
        {
          user: {
            name: 'Mike Johnson',
            image: 'https://via.placeholder.com/40'
          },
          course: 'Web Development',
          review: 'Comprehensive course covering everything from HTML to advanced JavaScript. The support from instructors is excellent.',
          rating: 4
        },
        {
          user: {
            name: 'Sarah Wilson',
            image: 'https://via.placeholder.com/40'
          },
          course: 'Data Science',
          review: 'Great introduction to data science. The hands-on approach with real datasets makes learning enjoyable and practical.',
          rating: 5
        }
      ])
  
      const slideWidth = computed(() => {
        // Adjust based on screen size
        if (window.innerWidth >= 1024) return 33.333 // lg: 3 slides
        if (window.innerWidth >= 768) return 50 // md: 2 slides
        return 100 // sm: 1 slide
      })
  
      const totalSlides = computed(() => {
        const slidesPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1
        return Math.max(0, reviews.value.length - slidesPerView + 1)
      })
  
      const goToSlide = (index) => {
        currentSlide.value = index
      }
  
      const nextSlide = () => {
        currentSlide.value = (currentSlide.value + 1) % totalSlides.value
      }
  
      const startAutoSlide = () => {
        autoSlideInterval.value = setInterval(nextSlide, 4000)
      }
  
      const stopAutoSlide = () => {
        if (autoSlideInterval.value) {
          clearInterval(autoSlideInterval.value)
          autoSlideInterval.value = null
        }
      }
  
      const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text
        return text.slice(0, maxLength) + '...'
      }
  
      onMounted(() => {
        startAutoSlide()
      })
  
      onUnmounted(() => {
        stopAutoSlide()
      })
  
      return {
        currentSlide,
        reviews,
        slideWidth,
        totalSlides,
        goToSlide,
        truncateText
      }
    }
  }
  </script>