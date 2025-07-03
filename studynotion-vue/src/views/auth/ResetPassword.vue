<template>
  <AuthLayout>
    <div class="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <ResetPasswordForm />
    </div>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from '@/components/layout/AuthLayout.vue';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm.vue';
</script>