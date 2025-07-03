<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <RouterLink to="/">
        <img 
          class="mx-auto h-12 w-auto" 
          src="@/assets/images/logos/logo.svg" 
          alt="StudyNotion Logo"
        >
      </RouterLink>
      <h2 v-if="title" class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {{ title }}
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  }
});
</script>