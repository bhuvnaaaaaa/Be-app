import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Calendar } from 'lucide-react';
import { Badge } from '../types/profile';

interface BadgeGridProps {
  badges: Badge[];
  getProgressTowardsBadge: (badge: Badge) => number;
}

const BadgeGrid: React.FC<BadgeGridProps> = ({ badges, getProgressTowardsBadge }) => {
  const unlockedBadges = badges.filter(badge => badge.unlockedAt !== null);
  const lockedBadges = badges.filter(badge => badge.unlockedAt === null);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const BadgeCard: React.FC<{ badge: Badge; isUnlocked: boolean }> = ({ badge, isUnlocked }) => {
    const progress = getProgressTowardsBadge(badge);
    
    return (
      <motion.div
        className={`relative p-4 rounded-2xl border transition-all duration-300 ${
          isUnlocked
            ? 'bg-white/10 border-white/20 shadow-[0_0_20px_rgba(167,139,250,0.2)]'
            : 'bg-white/5 border-white/10 opacity-60'
        }`}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        layout
      >
        {/* Badge Icon */}
        <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl ${
          isUnlocked 
            ? `bg-gradient-to-r ${badge.color} shadow-lg` 
            : 'bg-gray-600/30'
        }`}>
          {isUnlocked ? badge.icon : <Lock className="w-6 h-6 text-gray-400" />}
        </div>

        {/* Badge Name */}
        <h4 className={`text-sm font-display font-semibold text-center mb-1 ${
          isUnlocked ? 'text-purple-200' : 'text-gray-400'
        }`}>
          {badge.name}
        </h4>

        {/* Badge Description */}
        <p className={`text-xs text-center leading-relaxed ${
          isUnlocked ? 'text-purple-300/80' : 'text-gray-500'
        }`}>
          {badge.description}
        </p>

        {/* Unlock Date or Progress */}
        {isUnlocked ? (
          <div className="flex items-center justify-center mt-3 text-xs text-purple-400">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{formatDate(badge.unlockedAt!)}</span>
          </div>
        ) : (
          <div className="mt-3">
            <div className="w-full bg-gray-700/30 rounded-full h-1.5 mb-1">
              <motion.div
                className="bg-gradient-to-r from-purple-400 to-pink-400 h-1.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <p className="text-xs text-center text-gray-500">
              {Math.round(progress * 100)}% complete
            </p>
          </div>
        )}

        {/* Glow effect for unlocked badges */}
        {isUnlocked && (
          <motion.div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${badge.color} opacity-20 blur-xl -z-10`}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [0.95, 1.05, 0.95]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Unlocked Badges */}
      {unlockedBadges.length > 0 && (
        <div>
          <h3 className="text-lg font-display font-semibold text-purple-200 mb-4 flex items-center">
            <span className="mr-2">🏆</span>
            Earned Badges ({unlockedBadges.length})
          </h3>
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            layout
          >
            {unlockedBadges
              .sort((a, b) => new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime())
              .map((badge) => (
                <BadgeCard key={badge.id} badge={badge} isUnlocked={true} />
              ))}
          </motion.div>
        </div>
      )}

      {/* Locked Badges */}
      {lockedBadges.length > 0 && (
        <div>
          <h3 className="text-lg font-display font-semibold text-purple-300/70 mb-4 flex items-center">
            <span className="mr-2">🎯</span>
            Goals to Unlock ({lockedBadges.length})
          </h3>
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            layout
          >
            {lockedBadges
              .sort((a, b) => getProgressTowardsBadge(b) - getProgressTowardsBadge(a))
              .map((badge) => (
                <BadgeCard key={badge.id} badge={badge} isUnlocked={false} />
              ))}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BadgeGrid;