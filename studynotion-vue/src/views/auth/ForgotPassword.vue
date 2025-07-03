<template>
  <AuthLayout>
    <div class="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <ForgotPasswordForm />
    </div>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from '@/components/layout/AuthLayout.vue';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm.vue';
</script>