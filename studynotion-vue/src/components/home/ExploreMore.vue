<template>
  <section class="my-20">
    <!-- Header -->
    <div class="text-center mb-16">
      <h2 class="text-3xl lg:text-4xl font-semibold text-white mb-4">
        Unlock the <span class="gradient-text">Power of Code</span>
      </h2>
      <p class="text-richblack-300 text-lg font-semibold">
        Learn to Build Anything You Can Imagine
      </p>
    </div>

    <!-- Tabs -->
    <div class="hidden lg:flex justify-center mb-16">
      <div class="bg-richblack-800 rounded-full p-1 flex items-center space-x-1">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="selectTab(tab)"
          :class="[
            'px-6 py-3 rounded-full transition-all duration-200 text-sm font-medium',
            currentTab === tab
              ? 'bg-richblack-900 text-richblack-5'
              : 'text-richblack-200 hover:bg-richblack-700 hover:text-richblack-5'
          ]"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <!-- Course Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 px-4">
      <CourseCard
        v-for="course in currentCourses"
        :key="course.heading"
        :course="course"
        :is-active="currentCard === course.heading"
        @select="currentCard = course.heading"
      />
    </div>
  </section>
</template>

<script>
import { ref, computed, watch } from 'vue'
import CourseCard from './CourseCard.vue'

export default {
  name: 'ExploreMore',
  components: {
    CourseCard
  },
  setup() {
    const currentTab = ref('Free')
    const currentCard = ref('')

    const tabs = ['Free', 'New to coding', 'Most popular', 'Skills paths', 'Career paths']

    const courseData = {
      'Free': [
        {
          heading: 'Learn HTML',
          description: 'This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more.',
          level: 'Beginner',
          lessonNumber: 6
        },
        {
          heading: 'Learn CSS',
          description: 'This course explores advanced topics in HTML5 and CSS3, including animations, transitions, and layout techniques.',
          level: 'Beginner',
          lessonNumber: 6
        },
        {
          heading: 'Responsive Web design',
          description: 'This course teaches responsive web design techniques, allowing web pages to adapt to different devices and screen sizes.',
          level: 'Beginner',
          lessonNumber: 6
        }
      ],
      'New to coding': [
        {
          heading: 'HTML',
          description: 'This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more.',
          level: 'Beginner',
          lessonNumber: 6
        },
        {
          heading: 'CSS',
          description: 'This course explores advanced topics in HTML5 and CSS3, including animations, transitions, and layout techniques.',
          level: 'Beginner',
          lessonNumber: 6
        },
        {
          heading: 'Responsive Web design',
          description: 'This course teaches responsive web design techniques, allowing web pages to adapt to different devices and screen sizes.',
          level: 'Beginner',
          lessonNumber: 6
        }
      ],
      'Most popular': [
        {
          heading: 'Java',
          description: 'This course covers the basic concepts of Java programming including object-oriented programming, data structures, and algorithms.',
          level: 'Intermediate',
          lessonNumber: 8
        },
        {
          heading: 'Python',
          description: 'This course explores Python programming from basics to advanced topics including web development and data analysis.',
          level: 'Advanced',
          lessonNumber: 10
        },
        {
          heading: 'SCSS',
          description: 'This course teaches advanced CSS preprocessing with SCSS, including variables, mixins, and modular styling.',
          level: 'Intermediate',
          lessonNumber: 6
        }
      ],
      'Skills paths': [
        {
          heading: 'Flask',
          description: 'This course covers Flask web framework for Python, including routing, templates, and database integration.',
          level: 'Intermediate',
          lessonNumber: 7
        },
        {
          heading: 'Django',
          description: 'This course explores Django framework for building robust web applications with Python.',
          level: 'Intermediate',
          lessonNumber: 9
        },
        {
          heading: 'Fast API',
          description: 'This course teaches modern API development with FastAPI, including async programming and documentation.',
          level: 'Advanced',
          lessonNumber: 8
        }
      ],
      'Career paths': [
        {
          heading: 'Next.js',
          description: 'This course covers Next.js React framework for production-ready applications with server-side rendering.',
          level: 'Intermediate',
          lessonNumber: 10
        },
        {
          heading: 'Nuxt.js',
          description: 'This course explores Nuxt.js Vue framework for building universal applications with SSR and static generation.',
          level: 'Intermediate',
          lessonNumber: 9
        },
        {
          heading: 'Sanity',
          description: 'This course teaches content management with Sanity CMS for modern web applications.',
          level: 'Advanced',
          lessonNumber: 6
        }
      ]
    }

    // Pure computed property without side effects
    const currentCourses = computed(() => {
      return courseData[currentTab.value] || []
    })

    // Method to handle tab selection
    const selectTab = (tab) => {
      currentTab.value = tab
    }

    // Watch for changes in currentTab and update currentCard
    watch(currentTab, (newTab) => {
      const courses = courseData[newTab]
      if (courses && courses.length > 0) {
        currentCard.value = courses[0].heading
      }
    }, { immediate: true }) // immediate: true ensures it runs on initial setup

    return {
      currentTab,
      currentCard,
      tabs,
      currentCourses,
      selectTab
    }
  }
}
</script>