import { Badge } from '../types/profile';

export const availableBadges: Badge[] = [
  {
    id: 'first-session',
    name: 'First Steps',
    description: 'Complete your first meditation session',
    icon: '🌱',
    color: 'from-green-400 to-emerald-500',
    unlockedAt: null,
    requirement: { type: 'sessions', value: 1 }
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Meditate before 8 AM',
    icon: '🌅',
    color: 'from-orange-400 to-yellow-500',
    unlockedAt: null,
    requirement: { type: 'special', value: 1 }
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Meditate after 10 PM',
    icon: '🦉',
    color: 'from-indigo-400 to-purple-500',
    unlockedAt: null,
    requirement: { type: 'special', value: 1 }
  },
  {
    id: 'ten-sessions',
    name: 'Dedicated',
    description: 'Complete 10 meditation sessions',
    icon: '🎯',
    color: 'from-blue-400 to-cyan-500',
    unlockedAt: null,
    requirement: { type: 'sessions', value: 10 }
  },
  {
    id: 'hundred-minutes',
    name: 'Mindful Hour',
    description: 'Meditate for 100 total minutes',
    icon: '⏰',
    color: 'from-purple-400 to-pink-500',
    unlockedAt: null,
    requirement: { type: 'minutes', value: 100 }
  },
  {
    id: 'seven-day-streak',
    name: 'Week Warrior',
    description: 'Maintain a 7-day meditation streak',
    icon: '🔥',
    color: 'from-red-400 to-orange-500',
    unlockedAt: null,
    requirement: { type: 'streak', value: 7 }
  },
  {
    id: 'thirty-day-streak',
    name: 'Zen Master',
    description: 'Maintain a 30-day meditation streak',
    icon: '🧘‍♀️',
    color: 'from-violet-400 to-purple-600',
    unlockedAt: null,
    requirement: { type: 'streak', value: 30 }
  },
  {
    id: 'fifty-sessions',
    name: 'Committed',
    description: 'Complete 50 meditation sessions',
    icon: '💎',
    color: 'from-cyan-400 to-blue-500',
    unlockedAt: null,
    requirement: { type: 'sessions', value: 50 }
  },
  {
    id: 'five-hundred-minutes',
    name: 'Time Keeper',
    description: 'Meditate for 500 total minutes',
    icon: '⌛',
    color: 'from-amber-400 to-orange-500',
    unlockedAt: null,
    requirement: { type: 'minutes', value: 500 }
  },
  {
    id: 'hundred-sessions',
    name: 'Enlightened',
    description: 'Complete 100 meditation sessions',
    icon: '✨',
    color: 'from-yellow-400 to-amber-500',
    unlockedAt: null,
    requirement: { type: 'sessions', value: 100 }
  },
  {
    id: 'thousand-minutes',
    name: 'Meditation Master',
    description: 'Meditate for 1000 total minutes',
    icon: '🏆',
    color: 'from-gold-400 to-yellow-600',
    unlockedAt: null,
    requirement: { type: 'minutes', value: 1000 }
  },
  {
    id: 'hundred-day-streak',
    name: 'Centurion',
    description: 'Maintain a 100-day meditation streak',
    icon: '👑',
    color: 'from-purple-500 to-pink-600',
    unlockedAt: null,
    requirement: { type: 'streak', value: 100 }
  }
];