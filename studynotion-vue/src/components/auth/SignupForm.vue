<template>
  <div class="min-h-screen bg-richblack-900 p-6">
    <!-- Success Popup -->
    <div v-if="showSuccessPopup" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-richblack-800 p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-richblack-5 mb-2">Registration Successful!</h3>
          <p class="text-richblack-200 mb-6">Your account has been created successfully. You will be redirected to the login page.</p>
          <div class="flex justify-center space-x-4">
            <button
              @click="goToLogin"
              class="px-4 py-2 bg-yellow-50 text-richblack-900 rounded-lg hover:bg-yellow-100 transition-colors font-medium"
            >
              Go to Login
            </button>
            <button
              @click="closePopup"
              class="px-4 py-2 bg-richblack-700 text-richblack-200 rounded-lg hover:bg-richblack-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab Component -->
    <div class="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max">
      <button
        @click="accountType = 'Student'"
        :class="[
          'py-2 px-5 rounded-full transition-all duration-200',
          accountType === 'Student' 
            ? 'bg-richblack-900 text-richblack-5' 
            : 'bg-transparent text-richblack-200 hover:bg-richblack-900 hover:text-richblack-5'
        ]"
        type="button"
      >
        Student
      </button>
      <button
        @click="accountType = 'Instructor'"
        :class="[
          'py-2 px-5 rounded-full transition-all duration-200',
          accountType === 'Instructor' 
            ? 'bg-richblack-900 text-richblack-5' 
            : 'bg-transparent text-richblack-200 hover:bg-richblack-900 hover:text-richblack-5'
        ]"
        type="button"
      >
        Instructor
      </button>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSignup" class="flex w-full flex-col gap-y-4">
      <div class="flex gap-x-4">
        <!-- First Name -->
        <label>
          <p class="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            First Name <sup class="text-pink-200">*</sup>
          </p>
          <input
            v-model="firstName"
            type="text"
            name="firstName"
            placeholder="Enter first name"
            required
            :style="{
              boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.18)',
            }"
            class="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none placeholder-richblack-400"
          />
          <div v-if="errors.firstName" class="mt-1 text-red-400 text-sm">
            {{ errors.firstName }}
          </div>
        </label>

        <!-- Last Name -->
        <label>
          <p class="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Last Name <sup class="text-pink-200">*</sup>
          </p>
          <input
            v-model="lastName"
            type="text"
            name="lastName"
            placeholder="Enter last name"
            required
            :style="{
              boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.18)',
            }"
            class="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none placeholder-richblack-400"
          />
          <div v-if="errors.lastName" class="mt-1 text-red-400 text-sm">
            {{ errors.lastName }}
          </div>
        </label>
      </div>

      <!-- Email Address -->
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
          :style="{
            boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.18)',
          }"
          class="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none placeholder-richblack-400"
        />
        <div v-if="errors.email" class="mt-1 text-red-400 text-sm">
          {{ errors.email }}
        </div>
      </label>

      <div class="flex gap-x-4">
        <!-- Create Password -->
        <label class="relative">
          <p class="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Create Password <sup class="text-pink-200">*</sup>
          </p>
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            placeholder="Enter Password"
            required
            :style="{
              boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.18)',
            }"
            class="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 outline-none placeholder-richblack-400"
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
          <div v-if="errors.password" class="mt-1 text-red-400 text-sm">
            {{ errors.password }}
          </div>
        </label>

        <!-- Confirm Password -->
        <label class="relative">
          <p class="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Confirm Password <sup class="text-pink-200">*</sup>
          </p>
          <input
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            :style="{
              boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.18)',
            }"
            class="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 outline-none placeholder-richblack-400"
          />
          <span
            @click="showConfirmPassword = !showConfirmPassword"
            class="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#AFB2BF">
              <path d="M19.604 2.562l-3.346 3.137c-1.27-.428-2.686-.699-4.243-.699-7.569 0-12.015 6.551-12.015 6.551s1.928 2.951 5.146 5.138l-2.911 2.909 1.414 1.414 17.37-17.035-1.415-1.415zm-6.016 5.779c-3.288-1.453-6.681 1.908-5.265 5.206l-1.726 1.707c-1.814-1.16-3.225-2.65-4.06-3.66 1.493-1.648 4.817-4.594 9.478-4.594.927 0 1.796.119 2.61.315l-1.037 1.026zm-2.883 7.431c5.282 2.313 8.69-2.308 5.393-5.639l-1.284 1.273c-.11.809-.719 1.432-1.538 1.432-.854 0-1.538-.49-1.538-1.125 0-.854.674-1.538 1.538-1.538.619 0 1.108.435 1.281 1.01l1.98-1.964c-2.594-2.636-6.956-1.12-6.956-1.12s-2.36 4.068-2.36 6.561c0 .295.015.588.484 1.11z"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#AFB2BF">
              <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/>
            </svg>
          </span>
          <div v-if="errors.confirmPassword" class="mt-1 text-red-400 text-sm">
            {{ errors.confirmPassword }}
          </div>
        </label>
      </div>

      <div v-if="showOTPField" class="mt-4">
        <label class="w-full">
          <p class="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            OTP <sup class="text-pink-200">*</sup>
          </p>
          <input
            v-model="otp"
            type="text"
            name="otp"
            placeholder="Enter OTP sent to your email"
            required
            :style="{
              boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.18)',
            }"
            class="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none placeholder-richblack-400"
          />
          <div v-if="errors.otp" class="mt-1 text-red-400 text-sm">
            {{ errors.otp }}
          </div>
        </label>
      </div>

      <button
        v-if="!showOTPField"
        type="button"
        @click="sendOTP"
        :disabled="isSendingOTP"
        class="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 disabled:opacity-50 hover:bg-yellow-100 transition-colors"
      >
        {{ isSendingOTP ? 'Sending OTP...' : 'Send OTP' }}
      </button>

      <button
        v-else
        type="submit"
        :disabled="authStore.isLoading"
        class="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 disabled:opacity-50 hover:bg-yellow-100 transition-colors"
      >
        {{ authStore.isLoading ? 'Creating Account...' : 'Create Account' }}
      </button>

      <div v-if="authStore.error" class="mt-4 text-red-400 text-center">
        {{ authStore.error }}
      </div>

      <div class="mt-6 text-center">
        <p class="text-richblack-5">
          Already have an account? 
          <RouterLink to="/login" class="text-blue-100 hover:underline">
            Log in
          </RouterLink>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const accountType = ref('Student');
const password = ref('');
const confirmPassword = ref('');
const otp = ref('');
const showOTPField = ref(false);
const isSendingOTP = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const errors = ref({});
const showSuccessPopup = ref(false);

const validateForm = () => {
  errors.value = {};
  
  if (!firstName.value) errors.value.firstName = 'First name is required';
  if (!lastName.value) errors.value.lastName = 'Last name is required';
  if (!email.value) errors.value.email = 'Email is required';
  if (!accountType.value) errors.value.accountType = 'Account type is required';
  if (!password.value) errors.value.password = 'Password is required';
  if (password.value.length < 8) errors.value.password = 'Password must be at least 8 characters';
  if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = 'Passwords do not match';
  }
  
  if (showOTPField.value && !otp.value) {
    errors.value.otp = 'OTP is required';
  }
  
  return Object.keys(errors.value).length === 0;
};

const sendOTP = async () => {
  if (!validateForm()) return;
  
  isSendingOTP.value = true;
  try {
    await authStore.sendOTP(email.value);
    showOTPField.value = true;
  } catch (error) {
    console.error('OTP sending error:', error);
  } finally {
    isSendingOTP.value = false;
  }
};

const handleSignup = async () => {
  if (!validateForm()) return;
  
  try {
    await authStore.signup({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      accountType: accountType.value,
      otp: otp.value
    });
    
    // Show success popup
    showSuccessPopup.value = true;
    
    // Auto redirect after 3 seconds
    setTimeout(() => {
      goToLogin();
    }, 3000);
    
  } catch (error) {
    console.error('Signup error:', error);
  }
};

const goToLogin = () => {
  showSuccessPopup.value = false;
  router.push('/login');
};

const closePopup = () => {
  showSuccessPopup.value = false;
};
</script>

<style scoped>
/* Updated custom colors for proper dark theme */
.text-richblack-5 {
  color: #f1f2ff;
}

.text-richblack-200 {
  color: #999daa;
}

.text-richblack-400 {
  color: #6e727f;
}

.text-pink-200 {
  color: #f472b6;
}

.bg-richblack-700 {
  background-color: #424854;
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
  color: #000814;
}

.text-blue-100 {
  color: #47a5f5;
}

.text-red-400 {
  color: #f87171;
}

.bg-green-100 {
  background-color: #dcfce7;
}

.text-green-600 {
  color: #16a34a;
}

.placeholder-richblack-400::placeholder {
  color: #6e727f;
}

.bg-richblack-600 {
  background-color: #47566b;
}
</style>