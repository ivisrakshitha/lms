<template>
  <div id="app" class="min-h-screen bg-richblack-900 text-white relative">
    <!-- Header with Navbar and MobileMenu -->
    <AppHeader @toggle-sidebar="toggleSidebar">
      <template #navbar>
        <AppNavbar />
      </template>
      <template #mobileMenu>
        <MobileMenu />
      </template>
    </AppHeader>

    <div class="flex">
      <!-- Sidebar -->
      <AppSidebar
        v-if="sidebarOpen"
        :isOpen="sidebarOpen"
        :isMobile="isMobile"
        @close="sidebarOpen = false"
      />

      <!-- Main Content -->
      <main :class="['flex-1 px-4 pt-20 transition-all', isDesktop ? 'md:ml-64' : '']">
        <BreadcrumbNav />
        <router-view />
      </main>
    </div>

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

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { ArrowUpIcon } from '@heroicons/vue/24/outline'

// Layout Components
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import BreadcrumbNav from '@/components/layout/BreadcrumbNav.vue'
import MobileMenu from '@/components/layout/MobileMenu.vue'

// State
const sidebarOpen = ref(true)
const isMobile = ref(false)
const showBackToTop = ref(false)
const isDesktop = computed(() => !isMobile.value)

// Scroll and Resize Handlers
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768
}
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 500
}
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Lifecycle
onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style>
/* Gradient text style */
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

/* Custom scrollbar for Webkit */
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
