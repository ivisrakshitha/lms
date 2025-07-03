<template>
  <div class="relative" ref="menuRef">
    <!-- Toggle Button -->
    <button @click="toggleMenu" class="text-white focus:outline-none" aria-label="Open menu">
      <i class="fas fa-ellipsis-v text-lg"></i>
    </button>

    <!-- Dropdown Menu -->
    <transition name="fade">
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50 overflow-hidden"
      >
        <router-link @click="closeMenu" to="/" class="mobile-link">🏠 Home</router-link>
        <router-link @click="closeMenu" to="/about" class="mobile-link">ℹ️ About</router-link>
        <router-link @click="closeMenu" to="/contact" class="mobile-link">📞 Contact</router-link>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const toggleMenu = () => (isOpen.value = !isOpen.value)
const closeMenu = () => (isOpen.value = false)

const menuRef = ref(null)

const handleClickOutside = (e) => {
  if (menuRef.value && !menuRef.value.contains(e.target)) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.mobile-link {
  @apply block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors duration-150;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
