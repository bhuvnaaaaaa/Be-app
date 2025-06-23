import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Edit3, 
  Check, 
  X, 
  Crown, 
  Flame, 
  Clock, 
  Target,
  Bell,
  Settings,
  Calendar,
  TrendingUp,
  Plus,
  Sparkles,
  Award,
  Star,
  Zap,
  Heart,
  Moon,
  Sun,
  Activity
} from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../hooks/useAuth';
import ProfilePicture from '../components/ProfilePicture';
import BadgeGrid from '../components/BadgeGrid';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const {
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
    getNextBadge,
    getProgressTowardsBadge
  } = useProfile();

  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    bio: profile.bio || ''
  });

  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [showAllStats, setShowAllStats] = useState(false);

  const handleSaveProfile = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditForm({ name: user?.name || '', bio: profile.bio || '' });
    setIsEditing(false);
  };

  const formatMinutes = (minutes: number): string => {
    if (minutes === 0) return '0m';
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours === 0) {
      return `${remainingMinutes}m`;
    } else if (remainingMinutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${remainingMinutes}m`;
    }
  };

  const nextBadge = getNextBadge();
  const unlockedBadges = getUnlockedBadges();
  const isNewUser = stats.totalSessions === 0;

  // Calculate additional stats
  const averageSessionLength = stats.totalSessions > 0 ? Math.round(stats.totalMinutesMeditated / stats.totalSessions) : 0;
  const completionRate = Math.round((unlockedBadges.length / badges.length) * 100);

  return (
    <div className="space-bg min-h-screen p-4 pt-12 pb-24 relative overflow-hidden">
      {/* Enhanced Celestial Objects */}
      <div className="celestial-object planet w-20 h-20 top-1/4 left-1/4 animate-orbit opacity-30" />
      <div className="celestial-object planet w-14 h-14 bottom-1/4 right-1/4 animate-orbit-reverse opacity-20" />
      <div className="celestial-object w-2 h-2 bg-purple-300 top-1/3 right-1/3 animate-twinkle" />
      <div className="celestial-object w-2 h-2 bg-pink-300 bottom-1/3 left-1/3 animate-twinkle" />
      <div className="celestial-object w-3 h-3 bg-blue-300 top-2/3 left-2/3 animate-twinkle" />
      
      {/* Floating Nebulae */}
      <div className="nebula celestial-object w-64 h-64 top-10 -left-10 animate-nebula opacity-20" />
      <div className="nebula celestial-object w-48 h-48 bottom-20 -right-10 animate-nebula opacity-15" 
           style={{ animationDelay: '5s' }} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-md mx-auto space-y-6 relative z-10"
      >
        {/* Enhanced Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-[0_0_30px_rgba(167,139,250,0.2)] border border-white/10 overflow-hidden"
        >
          {/* Gradient Background Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <ProfilePicture
                    src={profile.profilePicture}
                    alt={profile.name || 'User'}
                    isEditable={true}
                    onImageChange={(newUrl) => updateProfile({ profilePicture: newUrl })}
                  />
                  {/* Status Indicator */}
                  <motion.div
                    className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white/20 flex items-center justify-center"
                    animate={{ 
                      boxShadow: [
                        '0 0 10px rgba(34,197,94,0.3)',
                        '0 0 20px rgba(34,197,94,0.6)',
                        '0 0 10px rgba(34,197,94,0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </motion.div>
                </div>
                
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-purple-200 placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 font-display text-lg"
                        placeholder="Your name"
                      />
                      <textarea
                        value={editForm.bio}
                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-purple-200 placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 font-body resize-none"
                        placeholder="Tell us about your wellness journey..."
                        rows={3}
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h2 className="text-xl font-display font-bold text-purple-200 tan-mon-cheri-heading">
                          {profile.name || 'Welcome!'}
                        </h2>
                        {profile.subscriptionStatus === 'pro' && (
                          <motion.div
                            className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-1 rounded-full"
                            whileHover={{ scale: 1.05 }}
                            animate={{ 
                              boxShadow: [
                                '0 0 10px rgba(251,191,36,0.3)',
                                '0 0 20px rgba(251,191,36,0.6)',
                                '0 0 10px rgba(251,191,36,0.3)'
                              ]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            <Crown className="w-3 h-3 text-white" />
                            <span className="text-xs font-bold text-white">PRO</span>
                          </motion.div>
                        )}
                      </div>
                      <p className="text-purple-300/80 text-sm font-body leading-relaxed tan-mon-cheri-body mb-3">
                        {profile.bio || 'Add a bio to share your wellness journey with others'}
                      </p>
                      
                      {/* Quick Stats Row */}
                      <div className="flex items-center space-x-4 text-xs">
                        <div className="flex items-center space-x-1 text-purple-400">
                          <Calendar className="w-3 h-3" />
                          <span>Joined {profile.joinDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                        </div>
                        {!isNewUser && (
                          <div className="flex items-center space-x-1 text-purple-400">
                            <Award className="w-3 h-3" />
                            <span>{unlockedBadges.length} badges</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <motion.button
                      onClick={handleSaveProfile}
                      className="p-2 bg-green-600/30 hover:bg-green-600/50 rounded-xl transition-colors backdrop-blur-sm"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Check className="w-4 h-4 text-green-300" />
                    </motion.button>
                    <motion.button
                      onClick={handleCancelEdit}
                      className="p-2 bg-red-600/30 hover:bg-red-600/50 rounded-xl transition-colors backdrop-blur-sm"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-4 h-4 text-red-300" />
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    onClick={() => setIsEditing(true)}
                    className="p-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-xl transition-colors backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Edit3 className="w-4 h-4 text-purple-300" />
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* New User Welcome with Enhanced Design */}
        {isNewUser && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-gradient-to-br from-purple-600/20 via-pink-600/15 to-indigo-600/20 backdrop-blur-lg rounded-3xl p-6 shadow-[0_0_30px_rgba(167,139,250,0.2)] border border-purple-400/20 overflow-hidden"
          >
            {/* Animated Background Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-400/20 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
            
            <div className="relative z-10 text-center space-y-4">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Sparkles className="w-12 h-12 mx-auto text-purple-300" />
              </motion.div>
              <h3 className="text-xl font-display font-semibold text-purple-200 tan-mon-cheri-heading">
                Welcome to Your Wellness Journey!
              </h3>
              <p className="text-purple-300/80 text-sm font-body leading-relaxed tan-mon-cheri-body">
                Start your first meditation to begin tracking your progress, unlocking achievements, and building healthy habits.
              </p>
              <motion.button
                onClick={completeMeditationSession.bind(null, 5)}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-medium text-sm hover:shadow-lg transition-all backdrop-blur-sm"
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(167,139,250,0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4" />
                  <span>Start Your Journey</span>
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Enhanced Stats Dashboard */}
        {!isNewUser && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-[0_0_30px_rgba(167,139,250,0.2)] border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-display font-semibold text-purple-200 flex items-center tan-mon-cheri-heading">
                <Activity className="w-5 h-5 mr-2" />
                Your Progress
              </h3>
              <motion.button
                onClick={() => setShowAllStats(!showAllStats)}
                className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {showAllStats ? 'Show Less' : 'View All'}
              </motion.button>
            </div>

            {/* Primary Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Streak Counter */}
              <motion.div
                className="relative bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-4 text-center overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-transparent" />
                <motion.div
                  className="relative z-10 w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center"
                  animate={{ 
                    boxShadow: stats.currentStreak > 0 ? [
                      '0 0 20px rgba(251,146,60,0.3)',
                      '0 0 30px rgba(251,146,60,0.6)',
                      '0 0 20px rgba(251,146,60,0.3)'
                    ] : '0 0 10px rgba(251,146,60,0.2)'
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Flame className="w-6 h-6 text-white" />
                </motion.div>
                <div className="relative z-10">
                  <div className="text-2xl font-display font-bold text-orange-300 mb-1">
                    {stats.currentStreak}
                  </div>
                  <div className="text-xs text-orange-200/80 font-body">
                    Day Streak
                  </div>
                  {stats.longestStreak > 0 && (
                    <div className="text-xs text-orange-400/60 mt-1">
                      Best: {stats.longestStreak}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Total Time */}
              <motion.div
                className="relative bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-4 text-center overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent" />
                <div className="relative z-10 w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="relative z-10">
                  <div className="text-2xl font-display font-bold text-blue-300 mb-1">
                    {formatMinutes(stats.totalMinutesMeditated)}
                  </div>
                  <div className="text-xs text-blue-200/80 font-body">
                    Total Time
                  </div>
                  <div className="text-xs text-blue-400/60 mt-1">
                    {stats.totalSessions} sessions
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Expanded Stats */}
            <AnimatePresence>
              {showAllStats && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-2 gap-4 mb-4"
                >
                  {/* Average Session */}
                  <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl p-4 text-center">
                    <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-lg font-display font-bold text-emerald-300">
                      {averageSessionLength}m
                    </div>
                    <div className="text-xs text-emerald-200/80 font-body">
                      Avg Session
                    </div>
                  </div>

                  {/* Completion Rate */}
                  <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-2xl p-4 text-center">
                    <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-lg font-display font-bold text-pink-300">
                      {completionRate}%
                    </div>
                    <div className="text-xs text-pink-200/80 font-body">
                      Badges Earned
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Demo Session Button */}
            <motion.button
              onClick={() => completeMeditationSession(5)}
              className="w-full px-4 py-3 bg-gradient-to-r from-purple-600/30 to-pink-600/30 hover:from-purple-600/50 hover:to-pink-600/50 rounded-xl transition-all text-sm font-body flex items-center justify-center space-x-2 backdrop-blur-sm border border-white/10"
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(167,139,250,0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-4 h-4" />
              <span>Complete Demo Session</span>
            </motion.button>
          </motion.div>
        )}

        {/* Enhanced Next Badge Progress */}
        {nextBadge && !isNewUser && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-[0_0_30px_rgba(167,139,250,0.2)] border border-white/10 overflow-hidden"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-display font-semibold text-purple-200 flex items-center tan-mon-cheri-heading">
                  <Target className="w-5 h-5 mr-2" />
                  Next Achievement
                </h3>
                <div className="text-sm text-purple-400 bg-purple-500/20 px-3 py-1 rounded-full">
                  {Math.round(getProgressTowardsBadge(nextBadge) * 100)}%
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <motion.div 
                  className="w-14 h-14 bg-gray-600/30 rounded-2xl flex items-center justify-center text-2xl relative"
                  whileHover={{ scale: 1.1 }}
                >
                  {nextBadge.icon}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-pink-400/20"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <div className="flex-1">
                  <div className="text-lg font-display font-medium text-purple-200 mb-1 tan-mon-cheri-heading">
                    {nextBadge.name}
                  </div>
                  <div className="text-sm text-purple-300/80 tan-mon-cheri-body">
                    {nextBadge.description}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-full bg-gray-700/30 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${getProgressTowardsBadge(nextBadge) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-full"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                </div>
                <div className="flex justify-between text-xs text-purple-400 mt-2">
                  <span>Keep going!</span>
                  <span>Almost there!</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Enhanced Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-[0_0_30px_rgba(167,139,250,0.2)] border border-white/10"
        >
          <motion.button
            onClick={() => setShowNotificationSettings(!showNotificationSettings)}
            className="w-full flex items-center justify-between text-left group"
            whileHover={{ scale: 1.01 }}
          >
            <h3 className="text-lg font-display font-semibold text-purple-200 flex items-center tan-mon-cheri-heading">
              <Settings className="w-5 h-5 mr-2" />
              Preferences
            </h3>
            <motion.div
              animate={{ rotate: showNotificationSettings ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="p-2 rounded-full group-hover:bg-white/10 transition-colors"
            >
              <Settings className="w-4 h-4 text-purple-300" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {showNotificationSettings && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 space-y-4"
              >
                {/* Notification Toggles */}
                <div className="space-y-4">
                  {[
                    { key: 'dailyAffirmation', label: 'Daily Affirmations', icon: Sun },
                    { key: 'meditationReminder', label: 'Meditation Reminders', icon: Bell },
                    { key: 'streakReminder', label: 'Streak Reminders', icon: Flame }
                  ].map(({ key, label, icon: Icon }) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-lg flex items-center justify-center">
                          <Icon className="w-4 h-4 text-purple-300" />
                        </div>
                        <span className="text-sm text-purple-200 font-body tan-mon-cheri-body">{label}</span>
                      </div>
                      <motion.button
                        onClick={() => updateNotificationSettings({ 
                          [key]: !notificationSettings[key as keyof typeof notificationSettings] 
                        })}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          notificationSettings[key as keyof typeof notificationSettings]
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                            : 'bg-gray-600'
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="w-5 h-5 bg-white rounded-full shadow-md absolute top-0.5"
                          animate={{ 
                            x: notificationSettings[key as keyof typeof notificationSettings] ? 26 : 2 
                          }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </motion.button>
                    </div>
                  ))}
                </div>

                {/* Time Picker */}
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border-t border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-lg flex items-center justify-center">
                      <Moon className="w-4 h-4 text-indigo-300" />
                    </div>
                    <span className="text-sm text-purple-200 font-body tan-mon-cheri-body">Reminder Time</span>
                  </div>
                  <input
                    type="time"
                    value={notificationSettings.time}
                    onChange={(e) => updateNotificationSettings({ time: e.target.value })}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-purple-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 backdrop-blur-sm"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-[0_0_30px_rgba(167,139,250,0.2)] border border-white/10"
        >
          <div className="mb-6">
            <h3 className="text-lg font-display font-semibold text-purple-200 flex items-center tan-mon-cheri-heading">
              <Award className="w-5 h-5 mr-2" />
              Achievements
            </h3>
            <p className="text-sm text-purple-300/80 mt-1 tan-mon-cheri-body">
              Track your progress and unlock new milestones
            </p>
          </div>
          <BadgeGrid badges={badges} getProgressTowardsBadge={getProgressTowardsBadge} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;