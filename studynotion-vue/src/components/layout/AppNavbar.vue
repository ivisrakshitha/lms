<template>
  <nav class="flex items-center gap-6 text-sm text-white">
    <!-- Always visible -->
    <router-link to="/" class="nav-link">Home</router-link>
    <router-link to="/about" class="nav-link">About</router-link>
    <router-link to="/contact" class="nav-link">Contact</router-link>

    <!-- 👤 Guest-only links -->
    <router-link
      v-if="!authStore.isAuthenticated"
      to="/login"
      class="nav-link"
    >Login</router-link>

    <router-link
      v-if="!authStore.isAuthenticated"
      to="/signup"
      class="nav-link"
    >Sign Up</router-link>

    <!-- ✅ Authenticated-only links -->
    <router-link
      v-if="authStore.isAuthenticated"
      to="/dashboard"
      class="nav-link"
    >Dashboard</router-link>

    <button
      v-if="authStore.isAuthenticated"
      @click="logout"
      class="nav-link text-red-400 hover:text-red-300"
    >
      Logout
    </button>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.nav-link {
  @apply px-2 py-1 transition hover:text-yellow-300;
}
</style>
