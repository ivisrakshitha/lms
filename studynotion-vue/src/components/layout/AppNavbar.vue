<template>
  <nav class="flex space-x-6 text-sm">
    <router-link to="/" class="nav-link">Home</router-link>
    <router-link to="/about" class="nav-link">About</router-link>
    <router-link to="/contact" class="nav-link">Contact</router-link>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.nav-link {
  @apply text-white hover:text-gray-300 transition;
}
</style>
