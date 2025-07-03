<template>
    <component
      :is="tag"
      :to="to"
      :href="href"
      :type="type"
      :disabled="disabled"
      :class="buttonClasses"
      @click="handleClick"
    >
      <span v-if="loading" class="mr-2">
        <div class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
      </span>
      <slot />
    </component>
  </template>
  
  <script>
  import { computed } from 'vue'
  
  export default {
    name: 'BaseButton',
    props: {
      variant: {
        type: String,
        default: 'primary',
        validator: value => ['primary', 'secondary', 'outline', 'ghost'].includes(value)
      },
      size: {
        type: String,
        default: 'md',
        validator: value => ['sm', 'md', 'lg'].includes(value)
      },
      to: {
        type: [String, Object],
        default: null
      },
      href: {
        type: String,
        default: null
      },
      type: {
        type: String,
        default: 'button'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      fullWidth: {
        type: Boolean,
        default: false
      }
    },
    emits: ['click'],
    setup(props, { emit }) {
      const tag = computed(() => {
        if (props.to) return 'router-link'
        if (props.href) return 'a'
        return 'button'
      })
  
      const buttonClasses = computed(() => {
        const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
        
        const variantClasses = {
          primary: 'bg-yellow-50 text-richblack-900 hover:bg-yellow-200 focus:ring-yellow-50',
          secondary: 'bg-richblack-700 text-richblack-5 hover:bg-richblack-600 focus:ring-richblack-500',
          outline: 'border border-yellow-50 bg-transparent text-yellow-50 hover:bg-yellow-50 hover:text-richblack-900 focus:ring-yellow-50',
          ghost: 'bg-transparent text-richblack-5 hover:bg-richblack-700 focus:ring-richblack-500'
        }
        
        const sizeClasses = {
          sm: 'px-3 py-2 text-sm',
          md: 'px-6 py-3 text-base',
          lg: 'px-8 py-4 text-lg'
        }
        
        const disabledClasses = props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        const widthClasses = props.fullWidth ? 'w-full' : ''
        
        return [
          baseClasses,
          variantClasses[props.variant],
          sizeClasses[props.size],
          disabledClasses,
          widthClasses
        ].join(' ')
      })
  
      const handleClick = (event) => {
        if (!props.disabled && !props.loading) {
          emit('click', event)
        }
      }
  
      return {
        tag,
        buttonClasses,
        handleClick
      }
    }
  }
  </script>