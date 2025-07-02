<template>
    <header class="fixed top-0 w-full z-50 transition-all duration-300" :class="headerClasses">
      <nav class="w-11/12 max-w-maxContent mx-auto flex items-center justify-between py-4">
        <!-- Logo -->
        <router-link to="/" class="flex items-center">
          <img 
            src="/logo.png" 
            alt="StudyNotion" 
            class="h-10 w-auto"
            @error="handleLogoError"
          />
          <span class="ml-2 text-xl font-bold text-white">StudyNotion</span>
        </router-link>
  
        <!-- Desktop Navigation -->
        <ul class="hidden md:flex items-center space-x-8 text-richblack-25">
          <li v-for="link in navLinks" :key="link.title">
            <router-link 
              v-if="link.path"
              :to="link.path"
              class="hover:text-yellow-50 transition-colors duration-200 px-3 py-2 rounded-lg"
              :class="{ 'bg-yellow-25 text-richblack-900': isActiveRoute(link.path) }"
            >
              {{ link.title }}
            </router-link>
            
            <!-- Catalog Dropdown -->
            <div v-else-if="link.title === 'Catalog'" class="relative group">
              <button class="flex items-center hover:text-yellow-50 transition-colors duration-200 px-3 py-2 rounded-lg">
                {{ link.title }}
                <ChevronDownIcon class="ml-1 h-4 w-4" />
              </button>
              
              <!-- Dropdown Menu -->
              <div class="absolute left-0 mt-2 w-64 bg-richblack-5 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div class="py-2">
                  <a 
                    v-for="category in categories" 
                    :key="category.id"
                    href="#"
                    class="block px-4 py-2 text-richblack-700 hover:bg-richblack-50 transition-colors duration-200"
                  >
                    {{ category.name }}
                  </a>
                </div>
              </div>
            </div>
          </li>
        </ul>
  
        <!-- Auth Buttons / User Menu -->
        <div class="flex items-center space-x-4">
          <!-- Shopping Cart (for students) -->
          <button v-if="!isAuthenticated" class="relative p-2 text-richblack-25 hover:text-yellow-50 md:block hidden">
            <ShoppingCartIcon class="h-6 w-6" />
            <span class="absolute -top-1 -right-1 bg-yellow-50 text-richblack-900 text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </button>
  
          <!-- Auth Buttons -->
          <div v-if="!isAuthenticated" class="hidden md:flex items-center space-x-3">
            <BaseButton 
              to="/login" 
              variant="ghost" 
              size="sm"
              :class="{ 'ring-2 ring-yellow-50': $route.path === '/login' }"
            >
              Log in
            </BaseButton>
            <BaseButton 
              to="/signup" 
              variant="ghost" 
              size="sm"
              :class="{ 'ring-2 ring-yellow-50': $route.path === '/signup' }"
            >
              Sign Up
            </BaseButton>
          </div>
  
          <!-- User Menu (when authenticated) -->
          <div v-else class="relative">
            <!-- User Avatar -->
            <button @click="toggleUserMenu" class="flex items-center space-x-2 p-1 rounded-full hover:bg-richblack-700 transition-colors duration-200">
              <img 
                :src="userAvatar" 
                :alt="userName"
                class="h-8 w-8 rounded-full object-cover"
              />
              <ChevronDownIcon class="h-4 w-4 text-richblack-25" />
            </button>
  
            <!-- Dropdown Menu -->
            <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-richblack-800 rounded-lg shadow-lg border border-richblack-700">
              <div class="py-1">
                <router-link to="/dashboard" class="block px-4 py-2 text-richblack-25 hover:bg-richblack-700">
                  Dashboard
                </router-link>
                <button @click="logout" class="block w-full text-left px-4 py-2 text-richblack-25 hover:bg-richblack-700">
                  Logout
                </button>
              </div>
            </div>
          </div>
  
          <!-- Mobile Menu Button -->
          <button 
            @click="toggleMobileMenu"
            class="md:hidden p-2 text-richblack-25 hover:text-yellow-50"
          >
            <Bars3Icon v-if="!showMobileMenu" class="h-6 w-6" />
            <XMarkIcon v-else class="h-6 w-6" />
          </button>
        </div>
      </nav>
  
      <!-- Mobile Navigation -->
      <div v-if="showMobileMenu" class="md:hidden bg-richblack-900 border-t border-richblack-700">
        <div class="px-4 py-2 space-y-2">
          <router-link 
            v-for="link in mobileNavLinks" 
            :key="link.title"
            :to="link.path"
            class="block px-3 py-2 text-richblack-25 hover:text-yellow-50 hover:bg-richblack-800 rounded-lg transition-colors duration-200"
            @click="closeMobileMenu"
          >
            {{ link.title }}
          </router-link>
          
          <!-- Mobile Auth Buttons -->
          <div v-if="!isAuthenticated" class="pt-2 space-y-2">
            <BaseButton to="/login" variant="ghost" size="sm" full-width @click="closeMobileMenu">
              Log in
            </BaseButton>
            <BaseButton to="/signup" variant="primary" size="sm" full-width @click="closeMobileMenu">
              Sign Up
            </BaseButton>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { ChevronDownIcon, ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
  import BaseButton from '@/components/common/BaseButton.vue'
  
  export default {
    name: 'AppHeader',
    components: {
      BaseButton,
      ChevronDownIcon,
      ShoppingCartIcon,
      Bars3Icon,
      XMarkIcon
    },
    setup() {
      const route = useRoute()
      const showMobileMenu = ref(false)
      const showUserMenu = ref(false)
      const scrolled = ref(false)
  
      // Mock data - replace with actual store data
      const isAuthenticated = ref(false)
      const userName = ref('John Doe')
      const userAvatar = ref('https://via.placeholder.com/32')
  
      const navLinks = [
        { title: 'Home', path: '/' },
        { title: 'Catalog', path: null }, // Will have dropdown
        { title: 'About Us', path: '/about' },
        { title: 'Contact Us', path: '/contact' }
      ]
  
      const mobileNavLinks = [
        { title: 'Home', path: '/' },
        { title: 'About Us', path: '/about' },
        { title: 'Contact Us', path: '/contact' }
      ]
  
      const categories = ref([
        { id: 1, name: 'Web Development' },
        { id: 2, name: 'Mobile Development' },
        { id: 3, name: 'Data Science' },
        { id: 4, name: 'Machine Learning' },
        { id: 5, name: 'DevOps' }
      ])
  
      const headerClasses = computed(() => ({
        'bg-richblack-900 border-b border-richblack-700': scrolled.value,
        'bg-transparent': !scrolled.value
      }))
  
      const isActiveRoute = (path) => {
        return route.path === path
      }
  
      const toggleMobileMenu = () => {
        showMobileMenu.value = !showMobileMenu.value
        showUserMenu.value = false
      }
  
      const toggleUserMenu = () => {
        showUserMenu.value = !showUserMenu.value
        showMobileMenu.value = false
      }
  
      const closeMobileMenu = () => {
        showMobileMenu.value = false
      }
  
      const logout = () => {
        // Implement logout logic
        showUserMenu.value = false
      }
  
      const handleLogoError = (event) => {
        // Fallback when logo image fails to load
        event.target.style.display = 'none'
      }
  
      const handleScroll = () => {
        scrolled.value = window.scrollY > 50
      }
  
      const handleClickOutside = (event) => {
        if (!event.target.closest('.relative')) {
          showUserMenu.value = false
        }
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
        navLinks,
        mobileNavLinks,
        categories,
        isAuthenticated,
        userName,
        userAvatar,
        isActiveRoute,
        toggleMobileMenu,
        toggleUserMenu,
        closeMobileMenu,
        logout,
        handleLogoError
      }
    }
  }
  </script>