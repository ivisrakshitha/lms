<template>
  <div v-if="isAuthenticated">
    <!-- Backdrop for mobile -->
    <div
      v-if="isOpen && isMobile"
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="$emit('close')"
    ></div>

    <!-- Sidebar -->
    <transition name="slide">
      <aside
        v-if="isOpen"
        class="bg-richblack-800 text-white fixed top-16 left-0 h-[calc(100%-4rem)] z-50 shadow-lg transition-transform duration-300 ease-in-out"
        :class="[collapsed ? 'w-16' : 'w-64']"
      >
        <!-- Collapse Toggle -->
        <div class="flex justify-end px-4 py-3 border-b border-richblack-700">
          <button @click="toggleCollapse" class="text-yellow-400 hover:text-yellow-300 text-sm">
            {{ collapsed ? '➡️' : '⬅️' }}
          </button>
        </div>

        <!-- Nav Items -->
        <ul class="mt-6 space-y-2">
          <li v-for="item in menuItems" :key="item.path">
            <router-link
              :to="item.path"
              class="nav-link"
              :class="{ active: isActive(item.path) }"
              @click="handleLinkClick"
            >
              <span class="inline-block w-6 text-lg">{{ item.icon }}</span>
              <span v-if="!collapsed">{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </aside>
    </transition>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { storeToRefs } from 'pinia'

export default {
  name: 'AppSidebar',
  props: {
    isOpen: { type: Boolean, default: true },
    isMobile: { type: Boolean, default: false }
  },
  emits: ['close'],
  data() {
    return {
      collapsed: false,
      menuItems: [
        { path: '/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/courses', label: 'Courses', icon: '📚' }
      ]
    }
  },
  setup() {
    const route = useRoute()
    const authStore = useAuthStore()
    const { token } = storeToRefs(authStore)

    // ✅ Reactively tracks if user is authenticated
    const isAuthenticated = computed(() => !!token.value)

    const isActive = (path) => route.path.startsWith(path)

    return {
      isActive,
      isAuthenticated
    }
  },
  methods: {
    toggleCollapse() {
      this.collapsed = !this.collapsed
    },
    handleLinkClick() {
      if (this.isMobile) this.$emit('close')
    }
  }
}
</script>

<style scoped>
.nav-link {
  @apply flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium hover:bg-richblack-700 transition-all;
}

.active {
  @apply bg-richblack-700 text-yellow-400;
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
