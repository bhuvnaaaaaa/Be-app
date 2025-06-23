export interface UserProfile {
  id: string;
  name: string;
  bio: string;
  profilePicture: string;
  subscriptionStatus: 'free' | 'pro';
  joinDate: Date;
}

export interface UserStats {
  currentStreak: number;
  longestStreak: number;
  totalMinutesMeditated: number;
  totalSessions: number;
  lastMeditationDate: Date | null;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlockedAt: Date | null;
  requirement: {
    type: 'sessions' | 'minutes' | 'streak' | 'special';
    value: number;
  };
}

export interface NotificationSettings {
  dailyAffirmation: boolean;
  meditationReminder: boolean;
  streakReminder: boolean;
  time: string; // HH:MM format
}