<template>
  <slot v-if="isAuthorized" />
  <Unauthorized v-else />
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import Unauthorized from '@/views/Unauthorized.vue';

const props = defineProps({
  roles: {
    type: Array,
    default: () => []
  }
});

const authStore = useAuthStore();

const isAuthorized = computed(() => {
  if (!authStore.isAuthenticated) return false;
  if (props.roles.length === 0) return true;
  return props.roles.includes(authStore.user.accountType);
});
</script>