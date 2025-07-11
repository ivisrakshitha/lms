<template>
  <div class="min-h-screen bg-richblack-900 p-6">
    <div class="mx-auto max-w-md">
      <h1 class="text-2xl font-bold text-richblack-5 mb-2">Verify OTP</h1>
      <p class="text-richblack-400 mb-6">Enter the 6-digit OTP sent to {{ email }}</p>
      
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-y-4">
        <label class="w-full">
          <p class="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            OTP <sup class="text-pink-200">*</sup>
          </p>
          <input
            v-model="otp"
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            maxlength="6"
            placeholder="Enter 6-digit OTP"
            required
            class="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none"
          />
          <div v-if="errors.otp" class="mt-1 text-red-400 text-sm">
            {{ errors.otp }}
          </div>
        </label>

        <button
          type="submit"
          :disabled="isLoading"
          class="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 disabled:opacity-50 hover:bg-yellow-100 transition-colors"
        >
          {{ isLoading ? 'Verifying...' : 'Verify OTP' }}
        </button>

        <div v-if="error" class="mt-4 text-red-400 text-center">
          {{ error }}
        </div>

        <div class="mt-4 text-center">
          <button 
            @click="resendOTP"
            type="button"
            class="text-blue-100 hover:underline text-sm"
            :disabled="resendDisabled"
          >
            {{ resendDisabled ? `Resend OTP in ${countdown}s` : 'Resend OTP' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const email = ref(route.query.email || '');
const otp = ref('');
const errors = ref({});
const error = ref('');
const isLoading = ref(false);
const resendDisabled = ref(true);
const countdown = ref(30);

const startCountdown = () => {
  resendDisabled.value = true;
  countdown.value = 30;
  const timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer);
      resendDisabled.value = false;
    }
  }, 1000);
};

const resendOTP = async () => {
  try {
    await authStore.resetPasswordToken(email.value);
    startCountdown();
  } catch (err) {
    error.value = err.message || 'Failed to resend OTP';
  }
};

const handleSubmit = () => {
  errors.value = {};
  error.value = '';
  
  if (!otp.value || otp.value.length !== 6) {
    errors.value.otp = 'Please enter a valid 6-digit OTP';
    return;
  }

  // Navigate to reset password with OTP as token
  router.push({
    path: '/reset-password',
    query: { 
      email: email.value,
      otp: otp.value // Make sure to pass otp, not token
    }
  });
};

onMounted(() => {
  startCountdown();
});
</script>