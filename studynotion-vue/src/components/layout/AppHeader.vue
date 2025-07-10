<template>
  <header class="fixed top-0 w-full z-50 transition-all duration-300" :class="headerClasses">
    <nav class="w-11/12 max-w-maxContent mx-auto flex items-center justify-between py-4">
      <!-- Logo -->
      <router-link to="/" class="flex items-center">
        <img 
          src="/logo.png" 
          alt="IVIS LABS" 
          class="h-10 w-auto"
          @error="handleLogoError"
        />
        <span class="ml-2 text-xl font-bold text-white">IVIS LABS</span>
      </router-link>

      <!-- Desktop Navigation -->
      <ul class="hidden md:flex items-center space-x-8 text-richblack-25">
        <li v-for="link in filteredLinks" :key="link.title">
          <router-link 
            :to="link.path"
            class="hover:text-yellow-50 transition-colors duration-200 px-3 py-2 rounded-lg"
            :class="{ 'bg-yellow-25 text-richblack-900': isActiveRoute(link.path) }"
          >
            {{ link.title }}
          </router-link>
        </li>
      </ul>

      <!-- Auth Buttons / User Menu -->
      <div class="flex items-center space-x-4">
        <div v-if="!authStore.isAuthenticated" class="hidden md:flex items-center space-x-3">
          <BaseButton to="/login" variant="ghost" size="sm">Log in</BaseButton>
          <BaseButton to="/signup" variant="primary" size="sm">Sign Up</BaseButton>
        </div>
        <div v-else class="relative">
          <button @click="toggleUserMenu" class="flex items-center space-x-2 p-1 rounded-full hover:bg-richblack-700">
            <img :src="userAvatar" alt="user" class="h-8 w-8 rounded-full object-cover" />
            <ChevronDownIcon class="h-4 w-4 text-richblack-25" />
          </button>
          <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-richblack-800 rounded-lg shadow-lg border border-richblack-700">
            <router-link to="/dashboard" class="block px-4 py-2 hover:bg-richblack-700">Dashboard</router-link>
            <button @click="logout" class="block w-full text-left px-4 py-2 hover:bg-richblack-700">Logout</button>
          </div>
        </div>

        <!-- Mobile Menu Toggle -->
        <button @click="toggleMobileMenu" class="md:hidden p-2 text-richblack-25 hover:text-yellow-50">
          <Bars3Icon v-if="!showMobileMenu" class="h-6 w-6" />
          <XMarkIcon v-else class="h-6 w-6" />
        </button>
      </div>
    </nav>

    <!-- Mobile Nav -->
    <div v-if="showMobileMenu" class="md:hidden bg-richblack-900 border-t border-richblack-700 px-4 py-2 space-y-2">
      <router-link 
        v-for="link in filteredLinks" 
        :key="link.title"
        :to="link.path"
        class="block px-3 py-2 text-richblack-25 hover:bg-richblack-800 rounded-lg"
        @click="closeMobileMenu"
      >
        {{ link.title }}
      </router-link>

      <div v-if="!authStore.isAuthenticated" class="pt-2 space-y-2">
        <BaseButton to="/login" variant="ghost" size="sm" full-width @click="closeMobileMenu">Log in</BaseButton>
        <BaseButton to="/signup" variant="primary" size="sm" full-width @click="closeMobileMenu">Sign Up</BaseButton>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/stores/auth.js'
import BaseButton from '@/components/common/BaseButton.vue'

export default {
  components: {
    BaseButton,
    ChevronDownIcon,
    Bars3Icon,
    XMarkIcon
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const authStore = useAuthStore()

    const showMobileMenu = ref(false)
    const showUserMenu = ref(false)
    const scrolled = ref(false)

    const userAvatar = ref('https://via.placeholder.com/32')

    const navLinks = [
      { title: 'Home', path: '/' },
      { title: 'About', path: '/about' },
      { title: 'Contact', path: '/contact' },
      { title: 'Dashboard', path: '/dashboard', auth: true },
    ]

    const filteredLinks = computed(() =>
      navLinks.filter(link =>
        authStore.isAuthenticated ? link.title !== 'Login' && link.title !== 'Sign Up' : link.title !== 'Dashboard'
      )
    )

    const isActiveRoute = (path) => route.path === path

    const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value
      showUserMenu.value = false
    }

    const closeMobileMenu = () => {
      showMobileMenu.value = false
    }

    const toggleUserMenu = () => {
      showUserMenu.value = !showUserMenu.value
      showMobileMenu.value = false
    }

    const logout = () => {
      authStore.logout()
      router.push('/') // ✅ Redirects to Home instead of Login
    }

    const headerClasses = computed(() => ({
      'bg-richblack-900 border-b border-richblack-700': scrolled.value,
      'bg-transparent': !scrolled.value
    }))

    const handleScroll = () => {
      scrolled.value = window.scrollY > 50
    }

    const handleLogoError = (e) => {
      e.target.style.display = 'none'
    }

    const handleClickOutside = (e) => {
      if (!e.target.closest('.relative')) showUserMenu.value = false
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      showMobileMenu,
      showUserMenu,
      headerClasses,
      filteredLinks,
      authStore,
      userAvatar,
      isActiveRoute,
      toggleMobileMenu,
      closeMobileMenu,
      toggleUserMenu,
      logout,
      handleLogoError
    }
  }
}
</script>
