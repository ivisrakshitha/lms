// src/stores/auth.js
import { defineStore } from 'pinia';
import authService from '@/services/auth.service';
import api from '@/services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('authToken') || null,
    isLoading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
    isAdmin: (state) => state.user?.accountType === 'Admin',
    isInstructor: (state) => state.user?.accountType === 'Instructor',
    isStudent: (state) => state.user?.accountType === 'Student'
  },

  actions: {
    async login(credentials) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await authService.login(credentials);
        this.user = response.user;
        this.token = response.token;
        localStorage.setItem('authToken', response.token);
        return response;
      } catch (error) {
        this.error = error.message || 'Login failed';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async signup(userData) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await authService.signup(userData);
        return response;
      } catch (error) {
        this.error = error.message || 'Signup failed';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async sendOTP(email) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await authService.sendOTP(email);
        return response;
      } catch (error) {
        this.error = error.message || 'Failed to send OTP';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async changePassword(passwords) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await authService.changePassword(passwords);
        return response;
      } catch (error) {
        this.error = error.message || 'Password change failed';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async resetPasswordToken(email) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await authService.resetPasswordToken(email);
        return response;
      } catch (error) {
        this.error = error.message || 'Failed to send reset token';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async resetPassword(data) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await authService.resetPassword(data);
        return response;
      } catch (error) {
        this.error = error.message || 'Password reset failed';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    logout() {
      authService.logout();
      this.user = null;
      this.token = null;
    },

    async fetchUser() {
      if (this.token) {
        try {
          // You'll need to implement this endpoint in your backend
          const response = await api.get('/auth/me');
          this.user = response.data.user;
        } catch (error) {
          this.logout();
        }
      }
    }
  }
});