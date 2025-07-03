<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
    <p class="mt-4 text-lg text-gray-600">
      The page you're looking for doesn't exist.
    </p>
    <RouterLink
      to="/"
      class="mt-6 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
    >
      Go Home
    </RouterLink>
  </div>
</template>