'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { User, Role } from '@/lib/types';
import { USERS as initialUsers } from '@/lib/data';
import Loading from '@/app/loading';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  allUsers: User[];
  login: (usernameOrEmail: string, password?: string) => void;
  logout: () => void;
  isLoading: boolean;
  addUser: (user: Omit<User, 'id' | 'role' | 'status' | 'password'> & { password?: string }) => void;
  approveUser: (userId: string) => void;
  rejectUser: (userId: string) => void;
  updateUserRole: (userId: string, role: Role) => void;
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
        const parsedUser = JSON.parse(storedUser);
        // Sync with the main users list in case roles/status changed
        const freshUser = users.find(u => u.id === parsedUser.id);
        if (freshUser && freshUser.status === 'active') {
          setUser(freshUser);
        } else {
            localStorage.removeItem('agilebridge-user');
            setUser(null);
        }
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('agilebridge-user');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [users]);

  const login = (usernameOrEmail: string, password?: string) => {
    const foundUser = users.find(u => (u.email === usernameOrEmail || u.username === usernameOrEmail));
    
    if (!foundUser) {
        throw new Error("Invalid credentials");
    }

    if (foundUser.status === 'pending') {
        throw new Error("Your account is pending approval.");
    }
    
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
  
  const addUser = (newUser: Omit<User, 'id' | 'role'| 'status' | 'password'> & { password?: string }) => {
    const userExists = users.some(u => u.email === newUser.email || u.username === newUser.username);
    if(userExists) {
        throw new Error("User with this email or username already exists.");
    }
    const userWithDefaults: User = {
        ...newUser,
        id: String(Date.now()), // Use a more unique ID
        role: 'User', // Default role
        status: 'pending', // Default status
    };
    setUsers(prevUsers => [...prevUsers, userWithDefaults]);
  };

  const approveUser = (userId: string) => {
    setUsers(prevUsers => prevUsers.map(u => u.id === userId ? { ...u, status: 'active' } : u));
  };

  const rejectUser = (userId: string) => {
    setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
  }

  const updateUserRole = (userId: string, role: Role) => {
    setUsers(prevUsers => prevUsers.map(u => u.id === userId ? { ...u, role } : u));
  };


  const value = {
    isAuthenticated: !!user,
    user,
    allUsers: users,
    login,
    logout,
    isLoading,
    addUser,
    approveUser,
    rejectUser,
    updateUserRole,
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
