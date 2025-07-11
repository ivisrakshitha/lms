<template>
  <div class="forgot-password-form">
    <h2 class="form-title">Forgot Password</h2>
    <p class="form-subtitle">Enter your email to receive a password reset link</p>
    
    <form @submit.prevent="handleSubmit" class="auth-form">
      <BaseInput
        v-model="email"
        type="email"
        label="Email Address"
        placeholder="Enter your email"
        required
        :error="errors.email"
        @blur="validateEmail"
      />
      
      <BaseButton
        type="submit"
        :loading="isLoading"
        class="submit-btn"
      >
        Send Reset Link
      </BaseButton>
      
      <div class="form-footer">
        <router-link to="/login" class="link">Back to Login</router-link>
      </div>
    </form>
    
    <Toast
      v-if="showToast"
      :message="toastMessage"
      :type="toastType"
      @close="showToast = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseInput from '@/components/common/BaseInput.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import Toast from '@/components/ui/Toast.vue';
import { useAuthStore } from '@/stores/auth';
import { validateEmail as validateEmailFn } from '@/utils/validators';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const errors = ref({
  email: ''
});
const isLoading = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('');

const validateEmail = () => {
  errors.value.email = validateEmailFn(email.value);
};

const handleSubmit = async () => {
  validateEmail();
  
  if (errors.value.email) return;
  
  try {
    isLoading.value = true;
    await authStore.sendPasswordResetToken(email.value);
    
    toastMessage.value = 'Password reset link sent to your email';
    toastType.value = 'success';
    showToast.value = true;
    
    // Redirect to reset password page after a delay
    setTimeout(() => {
      router.push('/reset-password');
    }, 3000);
  } catch (error) {
    toastMessage.value = error.message || 'Failed to send reset link';
    toastType.value = 'error';
    showToast.value = true;
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.forgot-password-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
}

.form-subtitle {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  text-align: center;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.submit-btn {
  margin-top: 0.5rem;
}

.form-footer {
  margin-top: 1rem;
  text-align: center;
}

.link {
  color: var(--primary);
  text-decoration: none;
  font-size: 0.875rem;
}

.link:hover {
  text-decoration: underline;
}
</style>