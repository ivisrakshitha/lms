<template>
  <form @submit.prevent="handleSubmit" class="auth-form">
    <h2 class="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
    
    <p class="text-gray-600 mb-6 text-center">
      Enter your email address and we'll send you a link to reset your password.
    </p>
    
    <BaseInput
      v-model="email"
      type="email"
      label="Email"
      placeholder="Enter your email"
      required
      :error="errors.email"
    />
    
    <BaseButton
      type="submit"
      :loading="authStore.isLoading"
      class="w-full mt-4"
    >
      Send Reset Link
    </BaseButton>
    
    <div v-if="authStore.error" class="mt-4 text-red-500 text-center">
      {{ authStore.error }}
    </div>
    
    <div v-if="isSuccess" class="mt-4 text-green-500 text-center">
      Password reset link has been sent to your email.
    </div>
    
    <div class="mt-6 text-center">
      <RouterLink to="/login" class="text-primary hover:underline">
        Back to login
      </RouterLink>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import BaseInput from '@/components/common/BaseInput.vue';
import BaseButton from '@/components/common/BaseButton.vue';

const authStore = useAuthStore();

const email = ref('');
const isSuccess = ref(false);
const errors = ref({});

const handleSubmit = async () => {
  errors.value = {};
  
  if (!email.value) {
    errors.value.email = 'Email is required';
    return;
  }
  
  try {
    await authStore.resetPasswordToken(email.value);
    isSuccess.value = true;
  } catch (error) {
    console.error('Forgot password error:', error);
  }
};
</script>