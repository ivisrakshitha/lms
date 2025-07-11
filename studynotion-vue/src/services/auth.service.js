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
    throw new Error(error.response?.data?.message || 'Failed to send OTP');
  }
},


async resetPassword({ email, otp, password, confirmPassword }) {
  try {
    const response = await api.post('/auth/reset-password', {
      email,        // Required by backend
      otp,          // Required by backend (not token)
      password,     // Required by backend
      confirmPassword // Required by backend
    });
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message || 
                    'Password reset failed';
    throw new Error(errorMsg);
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
  },
  async sendPasswordResetToken(email) {
    try {
      const response = await api.post('/auth/reset-password-token', { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send reset password token');
    }
  }
};