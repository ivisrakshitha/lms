<template>
  <div class="auth-layout">
    <div class="content-wrapper">
      <slot />
    </div>
  </div>
</template>


<script>
export default {
  name: 'AuthLayout',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
};
</script>