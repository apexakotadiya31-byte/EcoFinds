import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { DUMMY_USERS } from '../data/dummy';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<boolean>;
  register: (email: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('ecofinds_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string) => {
    // Simulate API call
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const foundUser = DUMMY_USERS.find(u => u.email === email);
        if (foundUser) {
          setUser(foundUser);
          localStorage.setItem('ecofinds_user', JSON.stringify(foundUser));
          resolve(true);
        } else {
          // For demo purposes, if user not found in dummy, we can't login
          // But maybe we allow "demo" login with any email if we wanted, 
          // but let's stick to dummy users or new registration.
          // Actually, let's allow login if email matches a stored user in localstorage too?
          // For simplicity: Check dummy users.
          resolve(false);
        }
      }, 500);
    });
  };

  const register = async (email: string, name: string) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: `u${Date.now()}`,
          email,
          name,
          joinedDate: new Date().toISOString().split('T')[0],
          avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
        };
        setUser(newUser);
        localStorage.setItem('ecofinds_user', JSON.stringify(newUser));
        // In a real app we would add to DUMMY_USERS or a persistent store
        resolve(true);
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecofinds_user');
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('ecofinds_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
