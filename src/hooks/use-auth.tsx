'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { User, Role } from '@/lib/types';
import { USERS } from '@/lib/data';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const protectedRoutes = ['/dashboard', '/admin'];
const authRoutes = ['/login', '/signup', '/forgot-password'];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem('taskflow-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const isAuthenticated = !!user;
      const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
      const isAuthRoute = authRoutes.includes(pathname);

      if (isProtectedRoute && !isAuthenticated) {
        router.push('/login');
      }
      if (isAuthRoute && isAuthenticated) {
        router.push('/dashboard');
      }
    }
  }, [user, isLoading, pathname, router]);

  const login = (email: string) => {
    const foundUser = USERS.find(u => u.email === email);
    if (foundUser) {
        localStorage.setItem('taskflow-user', JSON.stringify(foundUser));
        setUser(foundUser);
        router.push('/dashboard');
    } else {
        // In a real app, you'd handle this error properly
        console.error("Login failed: User not found");
        throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    localStorage.removeItem('taskflow-user');
    setUser(null);
    router.push('/login');
  };
  
  const value = {
    isAuthenticated: !!user,
    user,
    login,
    logout,
    isLoading
  };

  if(isLoading) {
      return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
