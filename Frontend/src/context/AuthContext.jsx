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
  const [authStatus, setAuthStatus] = useState(false);

  // Function to check if user is authenticated and get user data
  const checkAuth = async () => {
    // Check both cookies and localStorage for auth status
    const token = localStorage.getItem('token');
    // auth_status cookie is set as a non-HTTP-only cookie to check if user is authenticated
    const cookieAuth = document.cookie.split(';').some(item => item.trim().startsWith('auth_status='));
    
    if (!token && !cookieAuth) {
      setIsLoading(false);
      setAuthStatus(false);
      return;
    }

    // Set auth status to true if either token or cookie exists
    setAuthStatus(true);

    try {
      // This will use HTTP-only cookie if available, falling back to localStorage token
      const response = await makeAuthenticatedRequest(getApiUrl('/auth/me'), {
        credentials: 'include' // Important: This tells fetch to include cookies
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
      } else {
        // Auth is invalid, clear everything
        clearAuth();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      clearAuth();
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to clear all auth data
  const clearAuth = () => {
    setUser(null);
    setAuthStatus(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // We can't clear HTTP-only cookies from frontend directly, 
    // but we set a flag to know auth status is false
    document.cookie = 'auth_status=; max-age=0; path=/;';
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setAuthStatus(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      // Call logout endpoint if authenticated
      if (isAuthenticated()) {
        await makeAuthenticatedRequest(getApiUrl('/auth/logout'), {
          method: 'POST',
          credentials: 'include' // Include cookies in request
        });
      }
    } catch (error) {
      console.error('Logout request failed:', error);
    }
    
    // Clear all auth data
    clearAuth();
  };
  
  // Helper to check if user is authenticated
  const isAuthenticated = () => {
    return authStatus && !!user;
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
        credentials: 'include' // Include cookies in request/response
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
        credentials: 'include' // Include cookies in request/response
      });

      const data = await response.json();
      
      if (data.success) {
        // Store token in localStorage (the HTTP-only cookie is automatically set by the backend)
        localStorage.setItem('token', data.token);
        setUser(data.user);
        setAuthStatus(true);
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
        credentials: 'include' // Include cookies in request/response
      });

      const data = await response.json();
      
      if (data.success && !data.data?.requiresOTP) {
        // Direct login without OTP
        localStorage.setItem('token', data.token);
        setUser(data.user);
        setAuthStatus(true);
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
        credentials: 'include' // Include cookies in request/response
      });

      const data = await response.json();
      
      if (data.success) {
        // Store token in localStorage (the HTTP-only cookie is automatically set by the backend)
        localStorage.setItem('token', data.token);
        setUser(data.user);
        setAuthStatus(true);
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
        credentials: 'include' // Include cookies in request/response
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
        credentials: 'include' // Include cookies in request/response
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
        credentials: 'include' // Include cookies in request/response
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
        credentials: 'include' // Include cookies in request/response
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

  // Check if token is valid - now checks both localStorage and cookies
  const isTokenValid = () => {
    // Check for auth_status cookie which indicates valid authentication
    const cookieAuth = document.cookie.split(';').some(item => item.trim().startsWith('auth_status='));
    
    // Also check localStorage token if it exists
    const token = localStorage.getItem('token');
    if (!token && !cookieAuth) return false;
    
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 > Date.now();
      } catch {
        return cookieAuth; // Fallback to cookie auth if token parsing fails
      }
    }
    
    return cookieAuth;
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: isAuthenticated(),
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
