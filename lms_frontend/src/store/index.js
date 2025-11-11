import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';

// PUBLIC_INTERFACE
export const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  });
  const [loading, setLoading] = useState(!!token);
  const [error, setError] = useState(null);

  // Load current user if token exists
  useEffect(() => {
    const handler = () => {
      logout();
    };
    window.addEventListener('auth:logout', handler);
    return () => window.removeEventListener('auth:logout', handler);
  }, []);

  useEffect(() => {
    async function fetchMe() {
      if (!token) return;
      setLoading(true);
      try {
        const me = await api.me();
        setUser(me);
        localStorage.setItem('user', JSON.stringify(me));
      } catch (e) {
        console.error(e);
        logout();
      } finally {
        setLoading(false);
      }
    }
    fetchMe();
  }, [token]);

  // PUBLIC_INTERFACE
  async function login({ email, password }) {
    setError(null);
    const data = await api.login(email, password);
    if (data?.token) {
      setToken(data.token);
      localStorage.setItem('token', data.token);
    }
    if (data?.user) {
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  }

  // PUBLIC_INTERFACE
  async function register(payload) {
    setError(null);
    const data = await api.register(payload);
    return data;
  }

  // PUBLIC_INTERFACE
  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  const value = useMemo(
    () => ({
      token,
      user,
      role: user?.role || 'student',
      isAuthenticated: !!token && !!user,
      loading,
      error,
      login,
      register,
      logout,
      hasRole: (r) => (user?.role || 'student') === r,
      hasAnyRole: (roles) => roles.includes(user?.role || 'student'),
    }),
    [token, user, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuthContext() {
  return useContext(AuthContext);
}
