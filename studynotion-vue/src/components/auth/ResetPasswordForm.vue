<template>
  <form @submit.prevent="handleSubmit" class="auth-form">
    <h2 class="text-2xl font-bold mb-6 text-center">Reset Password</h2>
    
    <BaseInput
      v-model="password"
      type="password"
      label="New Password"
      placeholder="Enter your new password"
      required
      :error="errors.password"
    />
    
    <BaseInput
      v-model="confirmPassword"
      type="password"
      label="Confirm New Password"
      placeholder="Confirm your new password"
      required
      :error="errors.confirmPassword"
    />
    
    <BaseButton
      type="submit"
      :loading="authStore.isLoading"
      class="w-full mt-4"
    >
      Reset Password
    </BaseButton>
    
    <div v-if="authStore.error" class="mt-4 text-red-500 text-center">
      {{ authStore.error }}
    </div>
    
    <div v-if="isSuccess" class="mt-4 text-green-500 text-center">
      Password has been reset successfully. You can now login with your new password.
    </div>
    
    <div class="mt-6 text-center">
      <RouterLink to="/login" class="text-primary hover:underline">
        Back to login
      </RouterLink>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import BaseInput from '@/components/common/BaseInput.vue';
import BaseButton from '@/components/common/BaseButton.vue';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const password = ref('');
const confirmPassword = ref('');
const isSuccess = ref(false);
const errors = ref({});

const token = ref('');

onMounted(() => {
  token.value = route.query.token;
  if (!token.value) {
    router.push('/forgot-password');
  }
});

const handleSubmit = async () => {
  errors.value = {};
  
  if (!password.value) errors.value.password = 'Password is required';
  if (password.value.length < 8) errors.value.password = 'Password must be at least 8 characters';
  if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = 'Passwords do not match';
  }
  
  if (Object.keys(errors.value).length > 0) return;
  
  try {
    await authStore.resetPassword({
      password: password.value,
      confirmPassword: confirmPassword.value,
      token: token.value
    });
    
    isSuccess.value = true;
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  } catch (error) {
    console.error('Reset password error:', error);
  }
};
</script>