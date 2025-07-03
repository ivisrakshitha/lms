// src/router/guards.js
import { useAuthStore } from '@/stores/auth';

export const authGuard = (to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } });
  } else if (to.meta.onlyGuest && authStore.isAuthenticated) {
    next({ name: 'Dashboard' });
  } else {
    next();
  }
};

export const roleGuard = (to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next({ name: 'Unauthorized' });
  } else if (to.meta.requiresInstructor && !authStore.isInstructor) {
    next({ name: 'Unauthorized' });
  } else if (to.meta.requiresStudent && !authStore.isStudent) {
    next({ name: 'Unauthorized' });
  } else {
    next();
  }
};