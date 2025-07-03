<template>
  <div id="app" class="min-h-screen bg-richblack-900">
    <!-- Header -->
    <AppHeader />
    
    <!-- Main Content -->
    <main class="pt-16">
      <router-view />
    </main>
    
    <!-- Footer -->
    <AppFooter />
    
    <!-- Back to Top Button -->
    <button 
      v-if="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-50 bg-yellow-25 hover:bg-yellow-50 text-richblack-900 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
    >
      <ArrowUpIcon class="w-5 h-5" />
    </button>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowUpIcon } from '@heroicons/vue/24/outline'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    ArrowUpIcon
  },
  setup() {
    const showBackToTop = ref(false)

    const handleScroll = () => {
      showBackToTop.value = window.scrollY > 500
    }

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      showBackToTop,
      scrollToTop
    }
  }
}
</script>

<style>
/* Additional global styles if needed */
.gradient-text {
  background: linear-gradient(118.19deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: bold;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #161D29;
}

::-webkit-scrollbar-thumb {
  background: #AFB2BF;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #999DAA;
}
</style>