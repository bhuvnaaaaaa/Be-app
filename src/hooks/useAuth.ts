import { useState, useEffect, createContext, useContext } from 'react';
import { User, AuthState, LoginCredentials, SignupCredentials } from '../types/auth';

// Mock authentication service - replace with real auth service
class AuthService {
  private static instance: AuthService;
  private users: Map<string, User & { password: string }> = new Map();
  private currentUser: User | null = null;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  constructor() {
    // Load user from localStorage on init
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
        // Convert date string back to Date object
        if (this.currentUser?.createdAt) {
          this.currentUser.createdAt = new Date(this.currentUser.createdAt);
        }
      } catch (error) {
        console.error('Error loading saved user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }

  async login(credentials: LoginCredentials): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = Array.from(this.users.values()).find(u => u.email === credentials.email);
    
    if (!user || user.password !== credentials.password) {
      throw new Error('Invalid email or password');
    }

    const { password, ...userWithoutPassword } = user;
    this.currentUser = userWithoutPassword;
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    return userWithoutPassword;
  }

  async signup(credentials: SignupCredentials): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = Array.from(this.users.values()).find(u => u.email === credentials.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      email: credentials.email,
      name: credentials.name,
      password: credentials.password,
      createdAt: new Date(),
      profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop&ixlib=rb-4.1.0'
    };

    this.users.set(newUser.id, newUser);
    
    const { password, ...userWithoutPassword } = newUser;
    
    // Don't automatically log in the user after signup
    // They need to sign in manually
    return userWithoutPassword;
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    // Clear all user-specific data
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('stats_') || key.startsWith('badges_') || key.startsWith('notifications_'))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  async updateProfile(updates: Partial<User>): Promise<User> {
    if (!this.currentUser) {
      throw new Error('No user logged in');
    }

    const updatedUser = { ...this.currentUser, ...updates };
    this.currentUser = updatedUser;
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    return updatedUser;
  }
}

const authService = AuthService.getInstance();

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: authService.getCurrentUser(),
    isLoading: false,
    error: null
  });

  const login = async (credentials: LoginCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const user = await authService.login(credentials);
      setAuthState({ user, isLoading: false, error: null });
      return user;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setAuthState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      throw error;
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const user = await authService.signup(credentials);
      // Don't set the user in state - they need to sign in manually
      setAuthState(prev => ({ ...prev, isLoading: false, error: null }));
      return user;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signup failed';
      setAuthState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      throw error;
    }
  };

  const logout = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      await authService.logout();
      setAuthState({ user: null, isLoading: false, error: null });
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      const updatedUser = await authService.updateProfile(updates);
      setAuthState(prev => ({ ...prev, user: updatedUser }));
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };

  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: null }));
  };

  return {
    ...authState,
    login,
    signup,
    logout,
    updateProfile,
    clearError
  };
};