import { defineStore } from 'pinia';
import authService from '@/services/auth.service';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoading: false,
    error: null,
    isInitialized: false
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    currentUser: (state) => state.user,
    isAdmin: (state) => state.user?.accountType === 'Admin',
    isInstructor: (state) => state.user?.accountType === 'Instructor',
    isStudent: (state) => state.user?.accountType === 'Student'
  },

  actions: {
    async init() {
      if (this.isInitialized) return;
      
      try {
        const response = await authService.getCurrentUser();
        this.user = response.user;
        this.isInitialized = true;
      } catch (error) {
        this.user = null;
        this.isInitialized = true;
      }
    },

    async login(credentials) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await authService.login(credentials);
        this.user = response.user;
        return response;
      } catch (error) {
        this.error = error.message || 'Login failed';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async register(userData) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await authService.signup(userData);
        // Automatically log in after registration
        await this.login({
          email: userData.email,
          password: userData.password
        });
        return response;
      } catch (error) {
        this.error = error.message || 'Registration failed';
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

    async requestPasswordReset(email) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await authService.resetPasswordToken(email);
        return response;
      } catch (error) {
        this.error = error.message || 'Failed to request password reset';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async resetPassword(token, passwords) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await authService.resetPassword({
          token,
          ...passwords
        });
        return response;
      } catch (error) {
        this.error = error.message || 'Password reset failed';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async logout() {
      try {
        await authService.logout();
        this.user = null;
      } catch (error) {
        this.error = error.message || 'Logout failed';
        throw error;
      }
    }
  }
});