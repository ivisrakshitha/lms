// src/services/auth.service.js
import api from './api';

export default {
  async sendOTP(email) {
    try {
      const response = await api.post('/auth/sendotp', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  async signup(userData) {
    try {
      const response = await api.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  async changePassword(passwords) {
    try {
      const response = await api.post('/auth/changepassword', passwords);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  async resetPasswordToken(email) {
    try {
      const response = await api.post('/auth/reset-password-token', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  async resetPassword(data) {
    try {
      const response = await api.post('/auth/reset-password', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  async logout() {
    try {
      // Clear token from local storage or cookies
      localStorage.removeItem('authToken');
      // You might also want to call a backend logout endpoint if available
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
};