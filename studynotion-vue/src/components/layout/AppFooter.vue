<template>
    <footer class="bg-richblack-800 mx-7 rounded-3xl mb-10">
      <div class="w-11/12 max-w-maxContent mx-auto py-14">
        <!-- Main Footer Content -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-8 border-b border-richblack-700">
          <!-- Company Info -->
          <div class="lg:col-span-1">
            <div class="flex items-center mb-6">
              <img src="/logo.png" alt="StudyNotion" class="h-10 w-auto" @error="handleLogoError" />
              <span class="ml-2 text-xl font-bold text-white">StudyNotion</span>
            </div>
            
            <div class="mb-6">
              <h3 class="text-richblack-50 font-semibold text-lg mb-3">Company</h3>
              <ul class="space-y-2">
                <li v-for="link in companyLinks" :key="link.name">
                  <router-link 
                    :to="link.path" 
                    class="text-richblack-400 hover:text-richblack-50 transition-colors duration-200 text-sm"
                  >
                    {{ link.name }}
                  </router-link>
                </li>
              </ul>
            </div>
  
            <!-- Social Links -->
            <div class="flex space-x-4">
              <a 
                v-for="social in socialLinks" 
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-richblack-400 hover:text-richblack-50 transition-colors duration-200"
              >
                <component :is="social.icon" class="h-5 w-5" />
              </a>
            </div>
          </div>
  
          <!-- Resources -->
          <div>
            <h3 class="text-richblack-50 font-semibold text-lg mb-3">Resources</h3>
            <ul class="space-y-2">
              <li v-for="link in resourceLinks" :key="link.name">
                <router-link 
                  :to="link.path" 
                  class="text-richblack-400 hover:text-richblack-50 transition-colors duration-200 text-sm"
                >
                  {{ link.name }}
                </router-link>
              </li>
            </ul>
  
            <h3 class="text-richblack-50 font-semibold text-lg mb-3 mt-6">Support</h3>
            <router-link 
              to="/help" 
              class="text-richblack-400 hover:text-richblack-50 transition-colors duration-200 text-sm"
            >
              Help Center
            </router-link>
          </div>
  
          <!-- Plans -->
          <div>
            <h3 class="text-richblack-50 font-semibold text-lg mb-3">Plans</h3>
            <ul class="space-y-2">
              <li v-for="link in planLinks" :key="link.name">
                <router-link 
                  :to="link.path" 
                  class="text-richblack-400 hover:text-richblack-50 transition-colors duration-200 text-sm"
                >
                  {{ link.name }}
                </router-link>
              </li>
            </ul>
  
            <h3 class="text-richblack-50 font-semibold text-lg mb-3 mt-6">Community</h3>
            <ul class="space-y-2">
              <li v-for="link in communityLinks" :key="link.name">
                <router-link 
                  :to="link.path" 
                  class="text-richblack-400 hover:text-richblack-50 transition-colors duration-200 text-sm"
                >
                  {{ link.name }}
                </router-link>
              </li>
            </ul>
          </div>
  
          <!-- Subjects -->
          <div>
            <h3 class="text-richblack-50 font-semibold text-lg mb-3">Subjects</h3>
            <ul class="space-y-2">
              <li v-for="subject in subjects" :key="subject.name">
                <router-link 
                  :to="subject.path" 
                  class="text-richblack-400 hover:text-richblack-50 transition-colors duration-200 text-sm"
                >
                  {{ subject.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
  
        <!-- Bottom Footer -->
        <div class="flex flex-col md:flex-row justify-between items-center pt-8 space-y-4 md:space-y-0">
          <!-- Legal Links -->
          <div class="flex items-center space-x-6">
            <router-link 
              v-for="link in legalLinks" 
              :key="link.name"
              :to="link.path" 
              class="text-richblack-400 hover:text-richblack-50 transition-colors duration-200 text-sm"
            >
              {{ link.name }}
            </router-link>
          </div>
  
          <!-- Copyright -->
          <div class="text-center">
            <p class="text-richblack-400 text-sm">
              Made with ❤️ by 
              <a href="#" class="text-richblack-50 hover:underline">StudyNotion Team</a>
            </p>
            <p class="text-richblack-400 text-sm mt-1">
              © {{ currentYear }} StudyNotion. All rights reserved.
            </p>
          </div>
  
          <!-- Additional Links -->
          <div class="flex items-center space-x-4">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-richblack-400 hover:text-richblack-50 transition-colors duration-200 p-2 rounded-full hover:bg-richblack-700"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-richblack-400 hover:text-richblack-50 transition-colors duration-200 p-2 rounded-full hover:bg-richblack-700"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  import { computed } from 'vue'
  
  export default {
    name: 'AppFooter',
    setup() {
      const currentYear = computed(() => new Date().getFullYear())
  
      const companyLinks = [
        { name: 'About', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Affiliates', path: '/affiliates' }
      ]
  
      const resourceLinks = [
        { name: 'Articles', path: '/articles' },
        { name: 'Blog', path: '/blog' },
        { name: 'Chart Sheet', path: '/chart-sheet' },
        { name: 'Code challenges', path: '/challenges' },
        { name: 'Docs', path: '/docs' },
        { name: 'Projects', path: '/projects' },
        { name: 'Videos', path: '/videos' },
        { name: 'Workspaces', path: '/workspaces' }
      ]
  
      const planLinks = [
        { name: 'Paid memberships', path: '/plans' },
        { name: 'For students', path: '/student-plans' },
        { name: 'Business solutions', path: '/business' }
      ]
  
      const communityLinks = [
        { name: 'Forums', path: '/forums' },
        { name: 'Chapters', path: '/chapters' },
        { name: 'Events', path: '/events' }
      ]
  
      const subjects = [
        { name: 'Web Development', path: '/catalog/web-development' },
        { name: 'Mobile Development', path: '/catalog/mobile-development' },
        { name: 'Data Science', path: '/catalog/data-science' },
        { name: 'Machine Learning', path: '/catalog/machine-learning' },
        { name: 'DevOps', path: '/catalog/devops' },
        { name: 'UI/UX Design', path: '/catalog/ui-ux-design' }
      ]
  
      const legalLinks = [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Cookie Policy', path: '/cookies' },
        { name: 'Terms', path: '/terms' }
      ]
  
      const socialLinks = [
        { name: 'Facebook', url: 'https://facebook.com', icon: 'FacebookIcon' },
        { name: 'Twitter', url: 'https://twitter.com', icon: 'TwitterIcon' },
        { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'LinkedInIcon' },
        { name: 'YouTube', url: 'https://youtube.com', icon: 'YouTubeIcon' }
      ]
  
      const handleLogoError = (event) => {
        event.target.style.display = 'none'
      }
  
      return {
        currentYear,
        companyLinks,
        resourceLinks,
        planLinks,
        communityLinks,
        subjects,
        legalLinks,
        socialLinks,
        handleLogoError
      }
    }
  }
  </script>