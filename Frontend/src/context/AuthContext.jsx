import React, { createContext, useContext, useState, useEffect } from 'react';
import { getApiUrl, makeAuthenticatedRequest } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to check if user is authenticated and get user data
  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await makeAuthenticatedRequest(getApiUrl('/auth/me'));

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
      } else {
        // Token is invalid, remove it
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    const token = localStorage.getItem('token');
    
    try {
      // Call logout endpoint if token exists
      if (token) {
        await makeAuthenticatedRequest(getApiUrl('/auth/logout'), {
          method: 'POST',
        });
      }
    } catch (error) {
      console.error('Logout request failed:', error);
    }
    
    // Clear local storage and state
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Register with OTP verification
  const registerWithOTP = async (userData) => {
    try {
      const response = await fetch(getApiUrl('/auth/register'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  };

  // Verify signup OTP
  const verifySignupOTP = async (sessionId, otp) => {
    try {
      const response = await fetch(getApiUrl('/auth/verify-signup-otp'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, otp }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Store token and user data
        localStorage.setItem('token', data.token);
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      console.error('OTP verification error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  };

  // Login with OTP support
  const loginWithOTP = async (email, password) => {
    try {
      const response = await fetch(getApiUrl('/auth/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (data.success && !data.data?.requiresOTP) {
        // Direct login without OTP
        localStorage.setItem('token', data.token);
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  };

  // Verify login OTP
  const verifyLoginOTP = async (sessionId, otp) => {
    try {
      const response = await fetch(getApiUrl('/auth/verify-login-otp'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, otp }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Store token and user data
        localStorage.setItem('token', data.token);
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      console.error('Login OTP verification error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  };

  // Resend OTP
  const resendOTP = async (sessionId) => {
    try {
      const response = await fetch(getApiUrl('/auth/resend-otp'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Resend OTP error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      const response = await fetch(getApiUrl('/auth/forgot-password'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Forgot password error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  };

  // Reset password
  const resetPassword = async (token, newPassword) => {
    try {
      const response = await fetch(getApiUrl('/auth/reset-password'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Reset password error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  };

  // Verify reset token
  const verifyResetToken = async (token) => {
    try {
      const response = await fetch(getApiUrl('/auth/verify-reset-token'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Verify reset token error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  };

  // Update user profile
  const updateUser = (updatedUserData) => {
    setUser(prev => ({ ...prev, ...updatedUserData }));
    localStorage.setItem('user', JSON.stringify({ ...user, ...updatedUserData }));
  };

  // Check if token is valid
  const isTokenValid = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
    // OTP-related methods
    registerWithOTP,
    verifySignupOTP,
    loginWithOTP,
    verifyLoginOTP,
    resendOTP,
    // Password reset methods
    forgotPassword,
    resetPassword,
    verifyResetToken,
    // Utility methods
    updateUser,
    isTokenValid,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
