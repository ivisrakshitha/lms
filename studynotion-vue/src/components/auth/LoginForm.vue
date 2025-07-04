<template>
  <div class="min-h-screen bg-richblack-900 p-6">
    <form @submit.prevent="handleLogin" class="mt-6 flex w-full flex-col gap-y-4">
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
     
      <label class="relative">
        <p class="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup class="text-pink-200">*</sup>
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
          class="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5 outline-none placeholder-richblack-400"
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
        <RouterLink to="/forgot-password">
          <p class="mt-1 ml-auto max-w-max text-xs text-blue-100 hover:underline">
            Forgot Password
          </p>
        </RouterLink>
      </label>

      <div class="flex justify-between items-center mb-2">
        <BaseCheckbox v-model="rememberMe" label="Remember me" />
      </div>
     
      <button
        type="submit"
        :disabled="authStore.isLoading"
        class="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 disabled:opacity-50 hover:bg-yellow-100 transition-colors"
      >
        {{ authStore.isLoading ? 'Signing In...' : 'Sign In' }}
      </button>
     
      <div v-if="authStore.error" class="mt-4 text-red-400 text-center">
        {{ authStore.error }}
      </div>
     
      <div v-if="loginSuccess" class="mt-4 text-green-400 text-center">
        Logged in successfully!
      </div>
     
      <div class="mt-6 text-center">
        <p class="text-richblack-5">
          Don't have an account?
          <RouterLink to="/signup" class="text-blue-100 hover:underline">
            Sign up
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
import BaseCheckbox from '@/components/common/BaseCheckbox.vue';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const showPassword = ref(false);
const errors = ref({});
const loginSuccess = ref(false);

const handleLogin = async () => {
  errors.value = {};
  loginSuccess.value = false;

  if (!email.value) errors.value.email = 'Email is required';
  if (!password.value) errors.value.password = 'Password is required';

  if (Object.keys(errors.value).length > 0) return;

  try {
    await authStore.login({
      email: email.value,
      password: password.value
    });

    loginSuccess.value = true;
    console.log('Logged in successfully!');

    router.push("/dashboard");

    email.value = '';
    password.value = '';

  } catch (error) {
    console.error('Login error:', error);
  }
};
</script>


<style scoped>
/* Updated custom colors for proper dark theme */
.text-richblack-5 {
  color: #f1f2ff; /* Changed from dark to white */
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