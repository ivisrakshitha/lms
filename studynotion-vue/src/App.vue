<template>
  <div id="app" class="min-h-screen bg-richblack-900 text-white relative">
    <!-- Header -->
    <AppHeader
      v-if="showLayout"
      @toggle-sidebar="toggleSidebar"
    >
      <template #navbar><AppNavbar /></template>
      <template #mobileMenu><MobileMenu /></template>
    </AppHeader>

    <!-- Main Layout -->
    <div class="flex">
      <!-- Fixed Sidebar -->
      <AppSidebar
        v-if="showLayout && isAuthenticated"
        :isOpen="sidebarOpen"
        :isMobile="isMobile"
        @close="sidebarOpen = false"
      />

      <!-- Main Content Area -->
      <main
        :class="[
          'flex-1 transition-all pt-20 px-4',
          showLayout && isAuthenticated && !isMobile ? 'ml-64' : ''
        ]"
      >
        <BreadcrumbNav v-if="showLayout && isAuthenticated" />
        <router-view />
      </main>
    </div>

    <!-- Footer -->
    <AppFooter v-if="showLayout && isAuthenticated" />

    <!-- Back to Top Button -->
    <button
      v-if="showBackToTop && showLayout && isAuthenticated"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-50 bg-yellow-25 hover:bg-yellow-50 text-richblack-900 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
    >
      <ArrowUpIcon class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { ArrowUpIcon } from '@heroicons/vue/24/outline'

// Layout components
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import BreadcrumbNav from '@/components/layout/BreadcrumbNav.vue'
import MobileMenu from '@/components/layout/MobileMenu.vue'

// Auth store
const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)

// Reactive state
const route = useRoute()
const sidebarOpen = ref(true)
const isMobile = ref(false)
const showBackToTop = ref(false)

// Show layout only for certain routes
const showLayout = computed(() => {
  const hiddenRoutes = ['/login', '/signup']
  return !hiddenRoutes.includes(route.path)
})

// Screen and scroll handlers
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
.gradient-text {
  background: linear-gradient(118.19deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: bold;
}

html {
  scroll-behavior: smooth;
}

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
