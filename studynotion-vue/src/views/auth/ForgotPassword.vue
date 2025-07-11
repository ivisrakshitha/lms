<template>
  <div class="min-h-screen bg-richblack-900 p-6">
    <div class="mx-auto max-w-md">
      <h1 class="text-2xl font-bold text-richblack-5 mb-2">Forgot Password</h1>
      <p class="text-richblack-400 mb-6">Enter your email to receive a password reset OTP</p>
      
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-y-4">
        <label class="w-full">
          <p class="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup class="text-pink-200">*</sup>
          </p>
          <input
            v-model="email"
            type="email"
            name="email"
            placeholder="Enter email address"
            required
            class="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
          />
          <div v-if="errors.email" class="mt-1 text-red-400 text-sm">
            {{ errors.email }}
          </div>
        </label>

        <button
          type="submit"
          :disabled="isLoading"
          class="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 disabled:opacity-50 hover:bg-yellow-100 transition-colors"
        >
          {{ isLoading ? 'Sending...' : 'Send OTP' }}
        </button>

        <div v-if="error" class="mt-4 text-red-400 text-center">
          {{ error }}
        </div>

        <div class="mt-6 text-center">
          <p class="text-richblack-5">
            Remember your password? 
            <RouterLink to="/login" class="text-blue-100 hover:underline">
              Login
            </RouterLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const errors = ref({});
const error = ref('');
const isLoading = ref(false);

const handleSubmit = async () => {
  errors.value = {};
  error.value = '';

  if (!email.value) {
    errors.value.email = 'Email is required';
    return;
  }

  isLoading.value = true;
  try {
    await authStore.resetPasswordToken(email.value);
    router.push({
      path: '/verify-otp',
      query: { email: email.value }
    });
  } catch (err) {
    error.value = err.message || 'Failed to send OTP';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Reuse the same styles from your login page */
.text-richblack-5 {
  color: #f1f2ff;
}

.text-richblack-400 {
  color: #6e727f;
}

.text-pink-200 {
  color: #f472b6;
}

.bg-richblack-800 {
  background-color: #2c333f;
}

.bg-richblack-900 {
  background-color: #000814;
}

.bg-yellow-50 {
  background-color: #ffd60a;
}

.bg-yellow-100 {
  background-color: #ffda33;
}

.text-richblack-900 {
  color: #e0e5ec;
}

.text-blue-100 {
  color: #47a5f5;
}

.text-red-400 {
  color: #f87171;
}

.text-green-400 {
  color: #4ade80;
}

.placeholder-richblack-400::placeholder {
  color: #6e727f;
}
</style>