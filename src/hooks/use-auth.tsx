'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { User } from '@/lib/types';
import { USERS as initialUsers } from '@/lib/data';
import Loading from '@/app/loading';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (usernameOrEmail: string, password?: string) => void;
  logout: () => void;
  isLoading: boolean;
  addUser: (user: Omit<User, 'id' | 'role' | 'password'> & { password?: string }) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('agilebridge-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('agilebridge-user');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (usernameOrEmail: string, password?: string) => {
    const foundUser = users.find(u => (u.email === usernameOrEmail || u.username === usernameOrEmail));
    if (foundUser && (!foundUser.password || foundUser.password === password)) {
        localStorage.setItem('agilebridge-user', JSON.stringify(foundUser));
        setUser(foundUser);
        router.push('/dashboard');
    } else {
        console.error("Login failed: User not found or password incorrect");
        throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    localStorage.removeItem('agilebridge-user');
    setUser(null);
    router.push('/login');
  };
  
  const addUser = (newUser: Omit<User, 'id' | 'role' | 'password'> & { password?: string }) => {
    const userExists = users.some(u => u.email === newUser.email || u.username === newUser.username);
    if(userExists) {
        throw new Error("User with this email or username already exists.");
    }
    const userWithDefaults: User = {
        ...newUser,
        id: String(users.length + 1),
        role: 'User', // Default role for new users
    };
    setUsers(prevUsers => {
        const newUsers = [...prevUsers, userWithDefaults];
        console.log("Updated users list:", newUsers);
        return newUsers;
    });
  }

  const value = {
    isAuthenticated: !!user,
    user,
    login,
    logout,
    isLoading,
    addUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
