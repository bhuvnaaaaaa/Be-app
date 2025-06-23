import { useState, useEffect } from 'react';
import { UserProfile, UserStats, Badge, NotificationSettings } from '../types/profile';
import { availableBadges } from '../data/badges';
import { useAuth } from './useAuth';

const defaultStats: UserStats = {
  currentStreak: 0,
  longestStreak: 0,
  totalMinutesMeditated: 0,
  totalSessions: 0,
  lastMeditationDate: null
};

const defaultNotificationSettings: NotificationSettings = {
  dailyAffirmation: false,
  meditationReminder: false,
  streakReminder: false,
  time: '09:00'
};

export const useProfile = () => {
  const { user, updateProfile: updateAuthProfile } = useAuth();
  const [stats, setStats] = useState<UserStats>(defaultStats);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(defaultNotificationSettings);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      // Load user-specific data from localStorage
      const savedStats = localStorage.getItem(`stats_${user.id}`);
      const savedBadges = localStorage.getItem(`badges_${user.id}`);
      const savedNotifications = localStorage.getItem(`notifications_${user.id}`);

      if (savedStats) {
        try {
          const parsedStats = JSON.parse(savedStats);
          // Convert date strings back to Date objects
          if (parsedStats.lastMeditationDate) {
            parsedStats.lastMeditationDate = new Date(parsedStats.lastMeditationDate);
          }
          setStats(parsedStats);
        } catch (error) {
          console.error('Error loading stats:', error);
        }
      }

      if (savedBadges) {
        try {
          const parsedBadges = JSON.parse(savedBadges);
          // Convert date strings back to Date objects
          const badgesWithDates = parsedBadges.map((badge: any) => ({
            ...badge,
            unlockedAt: badge.unlockedAt ? new Date(badge.unlockedAt) : null
          }));
          setBadges(badgesWithDates);
        } catch (error) {
          console.error('Error loading badges:', error);
          // Initialize with default badges if loading fails
          setBadges(availableBadges.map(badge => ({ ...badge, unlockedAt: null })));
        }
      } else {
        // Initialize badges for new user
        setBadges(availableBadges.map(badge => ({ ...badge, unlockedAt: null })));
      }

      if (savedNotifications) {
        try {
          setNotificationSettings(JSON.parse(savedNotifications));
        } catch (error) {
          console.error('Error loading notifications:', error);
        }
      }
    }
  }, [user]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`stats_${user.id}`, JSON.stringify(stats));
    }
  }, [stats, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`badges_${user.id}`, JSON.stringify(badges));
    }
  }, [badges, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`notifications_${user.id}`, JSON.stringify(notificationSettings));
    }
  }, [notificationSettings, user]);

  // Function to simulate completing a meditation session
  const completeMeditationSession = (durationMinutes: number) => {
    setStats(prev => {
      const newStats = {
        ...prev,
        totalSessions: prev.totalSessions + 1,
        totalMinutesMeditated: prev.totalMinutesMeditated + durationMinutes,
        lastMeditationDate: new Date()
      };

      // Update streak logic
      const today = new Date();
      const lastMeditation = prev.lastMeditationDate;
      
      if (!lastMeditation) {
        // First meditation ever
        newStats.currentStreak = 1;
        newStats.longestStreak = 1;
      } else {
        const daysDiff = Math.floor((today.getTime() - lastMeditation.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1) {
          // Consecutive day
          newStats.currentStreak = prev.currentStreak + 1;
          newStats.longestStreak = Math.max(newStats.currentStreak, prev.longestStreak);
        } else if (daysDiff === 0) {
          // Same day, maintain streak
          newStats.currentStreak = prev.currentStreak;
        } else {
          // Streak broken
          newStats.currentStreak = 1;
        }
      }

      // Check for badge unlocks
      checkAndUnlockBadges(newStats);
      
      return newStats;
    });
  };

  const checkAndUnlockBadges = (currentStats: UserStats) => {
    setBadges(prev => prev.map(badge => {
      if (badge.unlockedAt) return badge; // Already unlocked

      let shouldUnlock = false;
      
      switch (badge.requirement.type) {
        case 'sessions':
          shouldUnlock = currentStats.totalSessions >= badge.requirement.value;
          break;
        case 'minutes':
          shouldUnlock = currentStats.totalMinutesMeditated >= badge.requirement.value;
          break;
        case 'streak':
          shouldUnlock = currentStats.currentStreak >= badge.requirement.value || 
                        currentStats.longestStreak >= badge.requirement.value;
          break;
        case 'special':
          // Special badges like early bird, night owl would be unlocked based on time of meditation
          // For now, we'll unlock them after a few sessions as examples
          shouldUnlock = currentStats.totalSessions >= 3 && ['early-bird', 'night-owl'].includes(badge.id);
          break;
      }

      return shouldUnlock ? { ...badge, unlockedAt: new Date() } : badge;
    }));
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (user) {
      try {
        await updateAuthProfile(updates);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  const updateNotificationSettings = (updates: Partial<NotificationSettings>) => {
    setNotificationSettings(prev => ({ ...prev, ...updates }));
  };

  const getUnlockedBadges = () => badges.filter(badge => badge.unlockedAt !== null);
  const getLockedBadges = () => badges.filter(badge => badge.unlockedAt === null);

  const getNextBadge = () => {
    const locked = getLockedBadges();
    return locked.sort((a, b) => {
      // Sort by how close the user is to unlocking
      const progressA = getProgressTowardsBadge(a);
      const progressB = getProgressTowardsBadge(b);
      return progressB - progressA;
    })[0];
  };

  const getProgressTowardsBadge = (badge: Badge): number => {
    switch (badge.requirement.type) {
      case 'sessions':
        return Math.min(stats.totalSessions / badge.requirement.value, 1);
      case 'minutes':
        return Math.min(stats.totalMinutesMeditated / badge.requirement.value, 1);
      case 'streak':
        return Math.min(Math.max(stats.currentStreak, stats.longestStreak) / badge.requirement.value, 1);
      default:
        return 0;
    }
  };

  // Create profile object from user data
  const profile: UserProfile = user ? {
    id: user.id,
    name: user.name,
    bio: '', // You can extend the User type to include bio if needed
    profilePicture: user.profilePicture || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop&ixlib=rb-4.1.0',
    subscriptionStatus: 'free',
    joinDate: user.createdAt
  } : {
    id: '',
    name: '',
    bio: '',
    profilePicture: '',
    subscriptionStatus: 'free',
    joinDate: new Date()
  };

  return {
    profile,
    stats,
    badges,
    notificationSettings,
    isEditing,
    setIsEditing,
    updateProfile,
    updateNotificationSettings,
    completeMeditationSession,
    getUnlockedBadges,
    getLockedBadges,
    getNextBadge,
    getProgressTowardsBadge
  };
};