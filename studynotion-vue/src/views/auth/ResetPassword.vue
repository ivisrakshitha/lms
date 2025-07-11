<template>
  <div class="min-h-screen bg-richblack-900 p-6">
    <div class="mx-auto max-w-md">
      <h1 class="text-2xl font-bold text-richblack-5 mb-2">Reset Password</h1>
      <p class="text-richblack-400 mb-6">Create a new password for {{ email }}</p>
      
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-y-4">
        <label class="w-full">
          <p class="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            New Password <sup class="text-pink-200">*</sup>
          </p>
          <input
            v-model="newPassword"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter new password"
            required
            class="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5 outline-none"
          />
          <span
            @click="showPassword = !showPassword"
            class="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#AFB2BF">
              <path d="M19.604 2.562l-3.346 3.137c-1.27-.428-2.686-.699-4.243-.699-7.569 0-12.015 6.551-12.015 6.551s1.928 2.951 5.146 5.138l-2.911 2.909 1.414 1.414 17.37-17.035-1.415-1.415zm-6.016 5.779c-3.288-1.453-6.681 1.908-5.265 5.206l-1.726 1.707c-1.814-1.16-3.225-2.65-4.06-3.66 1.493-1.648 4.817-4.594 9.478-4.594.927 0 1.796.119 2.61.315l-1.037 1.026zm-2.883 7.431c5.282 2.313 8.69-2.308 5.393-5.639l-1.284 1.273c-.11.809-.719 1.432-1.538 1.432-.854 0-1.538-.49-1.538-1.125 0-.854.674-1.538 1.538-1.538.619 0 1.108.435 1.281 1.01l1.98-1.964c-2.594-2.636-6.956-1.12-6.956-1.12s-2.36 4.068-2.36 6.561c0 .295.015.588.484 1.11z"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#AFB2BF">
              <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/>
            </svg>
          </span>
          <div v-if="errors.newPassword" class="mt-1 text-red-400 text-sm">
            {{ errors.newPassword }}
          </div>
        </label>

        <label class="w-full">
          <p class="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Confirm Password <sup class="text-pink-200">*</sup>
          </p>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            required
            class="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
          />
          <div v-if="errors.confirmPassword" class="mt-1 text-red-400 text-sm">
            {{ errors.confirmPassword }}
          </div>
        </label>

        <button
          type="submit"
          :disabled="isLoading"
          class="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 disabled:opacity-50 hover:bg-yellow-100 transition-colors"
        >
          {{ isLoading ? 'Resetting...' : 'Reset Password' }}
        </button>

        <div v-if="error" class="mt-4 text-red-400 text-center">
          {{ error }}
        </div>

        <div v-if="success" class="mt-4 text-green-400 text-center">
          Password reset successfully! Redirecting to login...
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const email = ref(route.query.email || '');
const otp = ref(route.query.otp || ''); // Make sure this is passed from VerifyOTP page
const newPassword = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const errors = ref({});
const error = ref('');
const isLoading = ref(false);
const success = ref(false);

const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  // if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
  // if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
  // if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
  return '';
};

const handleSubmit = async () => {
  errors.value = {};
  error.value = '';
  success.value = false;

  // Validate password
  const passwordError = validatePassword(newPassword.value);
  if (passwordError) {
    errors.value.newPassword = passwordError;
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    errors.value.confirmPassword = 'Passwords do not match';
    return;
  }

  isLoading.value = true;
  try {
    await authStore.resetPassword({
      email: email.value, // Must include email
      otp: otp.value,     // Must include OTP
      password: newPassword.value,
      confirmPassword: confirmPassword.value
    });
    
    success.value = true;
  } catch (err) {
    error.value = err.message || 'Failed to reset password';
    console.error('Reset error:', err.response?.data || err);
  } finally {
    isLoading.value = false;
  }
};

watch(success, (val) => {
  if (val) {
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  }
});
</script>