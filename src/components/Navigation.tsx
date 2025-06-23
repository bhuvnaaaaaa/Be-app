import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, Radiation as Meditation, User, LogOut, AlertTriangle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/journal', icon: BookOpen, label: 'Journal' },
    { path: '/meditations', icon: Meditation, label: 'Meditations' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = async () => {
    try {
      await logout();
      setShowLogoutConfirm(false);
      // Redirect to login page after successful logout
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      setShowLogoutConfirm(false);
    }
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <nav className="fixed bottom-0 w-full p-4 z-50">
        <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-[0_0_20px_rgba(167,139,250,0.2)] p-2">
          <div className="flex justify-around items-center">
            {navItems.map(({ path, icon: Icon, label }) => {
              const isActive = location.pathname === path;
              return (
                <motion.button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`relative p-3 rounded-xl transition-colors ${
                    isActive ? 'text-purple-300' : 'text-purple-200/70 hover:text-purple-300'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navBackground"
                      className="absolute inset-0 bg-white/10 rounded-xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10">
                    <Icon className="w-6 h-6" />
                    <span className="text-xs mt-1 block font-body tracking-wide">{label}</span>
                  </div>
                </motion.button>
              );
            })}
            
            {/* Logout Button */}
            <motion.button
              onClick={handleLogoutClick}
              className="relative p-3 rounded-xl transition-colors text-red-300/70 hover:text-red-300"
              whileTap={{ scale: 0.95 }}
              title="Sign Out"
            >
              <div className="relative z-10">
                <LogOut className="w-6 h-6" />
                <span className="text-xs mt-1 block font-body tracking-wide">Logout</span>
              </div>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[100]"
            onClick={handleCancelLogout}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-[0_0_50px_rgba(167,139,250,0.3)] border border-white/20 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                
                <div>
                  <h3 className="text-xl font-display font-semibold text-purple-200 mb-2 tan-mon-cheri-heading">
                    Sign Out?
                  </h3>
                  <p className="text-purple-300/80 font-body tan-mon-cheri-body">
                    Are you sure you want to sign out? You'll need to sign in again to access your wellness journey.
                  </p>
                </div>

                <div className="flex space-x-3 pt-2">
                  <motion.button
                    onClick={handleCancelLogout}
                    className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-purple-200 font-body transition-colors tan-mon-cheri-body"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={handleConfirmLogout}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl text-white font-body font-medium transition-all tan-mon-cheri-body"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign Out
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;