<template>
  <div class="flex items-center">
    <input
      :id="id"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      type="checkbox"
      class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
    />
    <label v-if="label" :for="id" class="ml-2 block text-sm text-gray-900">
      {{ label }}
    </label>
  </div>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
  label: String,
  id: String
});

defineEmits(['update:modelValue']);
</script>