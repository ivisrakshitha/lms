import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';

export function useAuth() {
  const authStore = useAuthStore();

  // Initialize auth state when component mounts
  onMounted(() => {
    if (!authStore.user) {
      authStore.init();
    }
  });

  return {
    ...authStore
  };
}