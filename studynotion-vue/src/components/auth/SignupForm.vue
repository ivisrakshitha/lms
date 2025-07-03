<template>
  <form @submit.prevent="handleSignup" class="auth-form">
    <h2 class="text-2xl font-bold mb-6 text-center">Create an Account</h2>
    
    <div class="grid grid-cols-2 gap-4">
      <BaseInput
        v-model="firstName"
        label="First Name"
        placeholder="Enter your first name"
        required
        :error="errors.firstName"
      />
      
      <BaseInput
        v-model="lastName"
        label="Last Name"
        placeholder="Enter your last name"
        required
        :error="errors.lastName"
      />
    </div>
    
    <BaseInput
      v-model="email"
      type="email"
      label="Email"
      placeholder="Enter your email"
      required
      :error="errors.email"
    />
    
    <BaseSelect
      v-model="accountType"
      label="Account Type"
      :options="[
        { value: 'Student', label: 'Student' },
        { value: 'Instructor', label: 'Instructor' }
      ]"
      required
      :error="errors.accountType"
    />
    
    <BaseInput
      v-model="password"
      type="password"
      label="Password"
      placeholder="Create a password"
      required
      :error="errors.password"
    />
    
    <BaseInput
      v-model="confirmPassword"
      type="password"
      label="Confirm Password"
      placeholder="Confirm your password"
      required
      :error="errors.confirmPassword"
    />
    
    <div v-if="showOTPField" class="mt-4">
      <BaseInput
        v-model="otp"
        label="OTP"
        placeholder="Enter OTP sent to your email"
        required
        :error="errors.otp"
      />
    </div>
    
    <BaseButton
      v-if="!showOTPField"
      type="button"
      @click="sendOTP"
      :loading="isSendingOTP"
      variant="outline"
      class="w-full mt-4"
    >
      Send OTP
    </BaseButton>
    
    <BaseButton
      v-else
      type="submit"
      :loading="authStore.isLoading"
      class="w-full mt-4"
    >
      Create Account
    </BaseButton>
    
    <div v-if="authStore.error" class="mt-4 text-red-500 text-center">
      {{ authStore.error }}
    </div>
    
    <div class="mt-6 text-center">
      <p class="text-gray-600">
        Already have an account? 
        <RouterLink to="/login" class="text-primary hover:underline">
          AuthLogin
        </RouterLink>
      </p>
    </div>
  </form>
</template>

<script setup>
// Add this at the top of SignupForm.vue
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import BaseInput from '@/components/common/BaseInput.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import BaseSelect from '@/components/common/BaseSelect.vue';

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
const errors = ref({});

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
    await authStore.AuthSignup({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      accountType: accountType.value,
      otp: otp.value
    });
    
    // Redirect based on user role or to dashboard
    router.push('/dashboard');
  } catch (error) {
    console.error('Signup error:', error);
  }
};
</script>