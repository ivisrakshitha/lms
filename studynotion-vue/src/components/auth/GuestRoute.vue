<template>
  <slot v-if="!isAuthenticated" />
  <NotFound v-else />
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import NotFound from '@/views/NotFound.vue';

const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
</script>   