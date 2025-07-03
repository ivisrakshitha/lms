<template>
  <div class="dashboard-container">
    <!-- Header Section -->
    <header class="dashboard-header">
      <h1 class="text-3xl font-bold text-gray-800">Welcome Back, User!</h1>
      <div class="flex items-center space-x-4">
        <button class="notification-btn relative">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span class="notification-badge">3</span>
        </button>
        <div class="user-avatar">
          <img src="https://via.placeholder.com/40" alt="User" class="rounded-full">
        </div>
      </div>
    </header>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stats-card bg-blue-50">
        <div class="stats-icon bg-blue-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <div>
          <p class="stats-label">Total Users</p>
          <p class="stats-value">1,254</p>
          <p class="stats-change text-green-500">+12% from last month</p>
        </div>
      </div>

      <div class="stats-card bg-green-50">
        <div class="stats-icon bg-green-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <p class="stats-label">Revenue</p>
          <p class="stats-value">$24,780</p>
          <p class="stats-change text-green-500">+8% from last month</p>
        </div>
      </div>

      <div class="stats-card bg-purple-50">
        <div class="stats-icon bg-purple-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <div>
          <p class="stats-label">Orders</p>
          <p class="stats-value">356</p>
          <p class="stats-change text-red-500">-3% from last month</p>
        </div>
      </div>

      <div class="stats-card bg-orange-50">
        <div class="stats-icon bg-orange-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <p class="stats-label">Active Now</p>
          <p class="stats-value">42</p>
          <p class="stats-change text-green-500">+15% from last hour</p>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="content-grid">
      <!-- Recent Activity -->
      <div class="content-card">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-800">Recent Activity</h2>
          <button class="text-primary hover:underline">View All</button>
        </div>
        <div class="activity-list">
          <div v-for="(activity, index) in activities" :key="index" class="activity-item">
            <div class="activity-avatar">
              <img :src="activity.avatar" alt="User" class="rounded-full">
            </div>
            <div class="activity-details">
              <p class="activity-text">{{ activity.text }}</p>
              <p class="activity-time">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Stats Chart -->
      <div class="content-card">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Performance Overview</h2>
        <div class="chart-placeholder bg-gray-100 rounded-lg flex items-center justify-center h-64">
          <p class="text-gray-500">Chart will be displayed here</p>
        </div>
        <div class="mt-4 flex justify-between">
          <button class="chart-period-btn active">Week</button>
          <button class="chart-period-btn">Month</button>
          <button class="chart-period-btn">Quarter</button>
          <button class="chart-period-btn">Year</button>
        </div>
      </div>
    </div>

    <!-- Projects Table -->
    <div class="content-card mt-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-800">Recent Projects</h2>
        <button class="btn-primary">Create New</button>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Team</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(project, index) in projects" :key="index">
              <td>
                <div class="flex items-center">
                  <div class="project-icon mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  {{ project.name }}
                </div>
              </td>
              <td>
                <div class="flex -space-x-2">
                  <img v-for="(member, i) in project.team" :key="i" :src="member" class="w-8 h-8 rounded-full border-2 border-white" :style="`z-index: ${5 - i}`">
                </div>
              </td>
              <td>
                <span :class="`status-badge ${project.statusClass}`">{{ project.status }}</span>
              </td>
              <td>
                <div class="progress-bar-container">
                  <div class="progress-bar" :style="`width: ${project.progress}%`"></div>
                  <span class="progress-text">{{ project.progress }}%</span>
                </div>
              </td>
              <td>{{ project.dueDate }}</td>
              <td>
                <button class="action-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activities = ref([
  {
    avatar: 'https://via.placeholder.com/40',
    text: 'John Doe completed the dashboard design',
    time: '2 hours ago'
  },
  {
    avatar: 'https://via.placeholder.com/40',
    text: 'Sarah Smith uploaded new documents',
    time: '4 hours ago'
  },
  {
    avatar: 'https://via.placeholder.com/40',
    text: 'Mike Johnson commented on your project',
    time: '1 day ago'
  },
  {
    avatar: 'https://via.placeholder.com/40',
    text: 'System update completed successfully',
    time: '2 days ago'
  }
]);

const projects = ref([
  {
    name: 'Website Redesign',
    team: [
      'https://via.placeholder.com/40',
      'https://via.placeholder.com/40/cccccc',
      'https://via.placeholder.com/40/999999'
    ],
    status: 'In Progress',
    statusClass: 'status-in-progress',
    progress: 65,
    dueDate: 'Dec 15, 2023'
  },
  {
    name: 'Mobile App Development',
    team: [
      'https://via.placeholder.com/40',
      'https://via.placeholder.com/40/cccccc'
    ],
    status: 'On Hold',
    statusClass: 'status-on-hold',
    progress: 30,
    dueDate: 'Jan 20, 2024'
  },
  {
    name: 'Marketing Campaign',
    team: [
      'https://via.placeholder.com/40',
      'https://via.placeholder.com/40/cccccc',
      'https://via.placeholder.com/40/999999',
      'https://via.placeholder.com/40/666666'
    ],
    status: 'Completed',
    statusClass: 'status-completed',
    progress: 100,
    dueDate: 'Nov 5, 2023'
  }
]);
</script>

<style scoped>
.dashboard-container {
  @apply p-6 max-w-7xl mx-auto;
}

.dashboard-header {
  @apply flex justify-between items-center mb-8;
}

.notification-btn {
  @apply p-2 rounded-full hover:bg-gray-100;
}
.notification-badge {
  @apply absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center;
}

.stats-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8;
}
.stats-card {
  @apply p-6 rounded-lg shadow-sm flex items-start;
}
.stats-icon {
  @apply p-3 rounded-full mr-4;
}
.stats-label {
  @apply text-gray-500 text-sm;
}
.stats-value {
  @apply text-2xl font-bold text-gray-800 my-1;
}
.stats-change {
  @apply text-sm;
}

.content-grid {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-6;
}
.content-card {
  @apply bg-white p-6 rounded-lg shadow-sm;
}

.activity-list {
  @apply space-y-4;
}
.activity-item {
  @apply flex items-start;
}
.activity-avatar {
  @apply mr-3;
}
.activity-avatar img {
  @apply w-10 h-10;
}
.activity-details {
  @apply flex-1;
}
.activity-text {
  @apply text-gray-800;
}
.activity-time {
  @apply text-gray-500 text-sm;
}

.chart-placeholder {
  @apply bg-gray-100 rounded-lg flex items-center justify-center h-64;
}
.chart-period-btn {
  @apply px-3 py-1 text-sm rounded-md text-gray-600 hover:bg-gray-100;
}
.chart-period-btn.active {
  @apply bg-primary text-white hover:bg-primary-dark;
}

table {
  @apply w-full;
}
th {
  @apply text-left text-gray-500 font-medium py-3 px-4 border-b;
}
td {
  @apply py-3 px-4 border-b;
}
.project-icon {
  @apply text-primary;
}

.status-badge {
  @apply px-3 py-1 rounded-full text-xs font-medium;
}
.status-in-progress {
  @apply bg-blue-100 text-blue-800;
}
.status-on-hold {
  @apply bg-yellow-100 text-yellow-800;
}
.status-completed {
  @apply bg-green-100 text-green-800;
}

.progress-bar-container {
  @apply w-full bg-gray-200 rounded-full h-2.5 relative;
}
.progress-bar {
  @apply bg-primary h-2.5 rounded-full absolute top-0 left-0;
}
.progress-text {
  @apply text-xs text-gray-500 absolute -right-6 top-1/2 transform -translate-y-1/2;
}

.btn-primary {
  @apply bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-medium;
}
.action-btn {
  @apply text-gray-400 hover:text-gray-600;
}
</style>