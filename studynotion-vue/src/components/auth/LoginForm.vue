<template>
  <form @submit.prevent="handleLogin" class="auth-form">
    <h2 class="text-2xl font-bold mb-6 text-center">Login to StudyNotion</h2>
    
    <BaseInput
      v-model="email"
      type="email"
      label="Email"
      placeholder="Enter your email"
      required
      :error="errors.email"
    />
    
    <BaseInput
      v-model="password"
      type="password"
      label="Password"
      placeholder="Enter your password"
      required
      :error="errors.password"
    />
    
    <div class="flex justify-between items-center mb-6">
      <BaseCheckbox v-model="rememberMe" label="Remember me" />
      <RouterLink 
        to="/forgot-password" 
        class="text-primary hover:underline text-sm"
      >
        Forgot password?
      </RouterLink>
    </div>
    
    <BaseButton
      type="submit"
      :loading="authStore.isLoading"
      class="w-full"
    >
      AuthLogin
    </BaseButton>
    
    <div v-if="authStore.error" class="mt-4 text-red-500 text-center">
      {{ authStore.error }}
    </div>
    
    <div class="mt-6 text-center">
      <p class="text-gray-600">
        Don't have an account? 
        <RouterLink to="/signup" class="text-primary hover:underline">
          Sign up
        </RouterLink>
      </p>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import BaseInput from '@/components/common/BaseInput.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import BaseCheckbox from '@/components/common/BaseCheckbox.vue';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const errors = ref({});

const handleLogin = async () => {
  errors.value = {};
  
  // Simple validation
  if (!email.value) errors.value.email = 'Email is required';
  if (!password.value) errors.value.password = 'Password is required';
  
  if (Object.keys(errors.value).length > 0) return;
  
  try {
    await authStore.login({
      email: email.value,
      password: password.value
    });
    
    // Redirect based on user role or to dashboard
    router.push('/dashboard');
  } catch (error) {
    console.error('Login error:', error);
  }
};
</script>