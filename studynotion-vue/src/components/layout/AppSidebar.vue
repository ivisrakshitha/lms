<template>
  <div>
    <!-- Backdrop -->
    <div
      v-if="isOpen && isMobile"
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="$emit('close')"
    ></div>

    <!-- Sidebar -->
    <transition name="slide">
      <aside
        v-if="isOpen"
        class="bg-gray-900 text-white h-full fixed top-0 left-0 z-50 shadow-lg transform transition-transform duration-300 ease-in-out"
        :class="collapsed ? 'w-20' : 'w-64'"
      >
        <!-- Toggle Button -->
        <div class="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 v-if="!collapsed" class="text-xl font-bold">📘 StudyNotion</h2>
          <button @click="toggleCollapse" class="text-yellow-400 text-sm">
            {{ collapsed ? '➡️' : '⬅️' }}
          </button>
        </div>

        <ul class="space-y-3 mt-6 px-3">
          <li>
            <router-link
              to="/"
              class="nav-link"
              :class="{ active: isActive('/') }"
              @click="handleLinkClick"
            >
              <span class="inline-block w-6">🏠</span>
              <span v-if="!collapsed">Home</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/courses"
              class="nav-link"
              :class="{ active: isActive('/courses') }"
              @click="handleLinkClick"
            >
              <span class="inline-block w-6">📚</span>
              <span v-if="!collapsed">Courses</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/dashboard"
              class="nav-link"
              :class="{ active: isActive('/dashboard') }"
              @click="handleLinkClick"
            >
              <span class="inline-block w-6">📊</span>
              <span v-if="!collapsed">Dashboard</span>
            </router-link>
          </li>
        </ul>
      </aside>
    </transition>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  name: 'AppSidebar',
  props: {
    isOpen: {
      type: Boolean,
      default: true
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  data() {
    return {
      collapsed: false
    }
  },
  setup() {
    const route = useRoute()
    const isActive = (path) => route.path === path
    return { isActive }
  },
  methods: {
    toggleCollapse() {
      this.collapsed = !this.collapsed
    },
    handleLinkClick() {
      if (this.isMobile) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style scoped>
.nav-link {
  @apply flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-all;
}

.active {
  @apply bg-gray-800 text-yellow-400;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
</style>
