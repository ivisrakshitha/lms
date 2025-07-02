<template>
    <span>{{ displayText }}<span v-if="showCursor" class="animate-pulse">|</span></span>
  </template>
  
  <script>
  import { ref, onMounted, watch } from 'vue'
  
  export default {
    name: 'TypeWriter',
    props: {
      text: {
        type: String,
        required: true
      },
      typeSpeed: {
        type: Number,
        default: 100
      },
      startDelay: {
        type: Number,
        default: 0
      },
      showCursor: {
        type: Boolean,
        default: true
      }
    },
    setup(props) {
      const displayText = ref('')
      const currentIndex = ref(0)
      const isTyping = ref(false)
  
      const typeText = () => {
        if (currentIndex.value < props.text.length) {
          displayText.value += props.text.charAt(currentIndex.value)
          currentIndex.value++
          setTimeout(typeText, props.typeSpeed)
        } else {
          isTyping.value = false
        }
      }
  
      const startTyping = () => {
        isTyping.value = true
        currentIndex.value = 0
        displayText.value = ''
        setTimeout(typeText, props.startDelay)
      }
  
      onMounted(() => {
        startTyping()
      })
  
      watch(() => props.text, () => {
        startTyping()
      })
  
      return {
        displayText,
        isTyping
      }
    }
  }
  </script>