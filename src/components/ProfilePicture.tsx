import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, User } from 'lucide-react';

interface ProfilePictureProps {
  src: string;
  alt: string;
  isEditable: boolean;
  onImageChange?: (newImageUrl: string) => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ 
  src, 
  alt, 
  isEditable, 
  onImageChange 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageChange) {
      setIsUploading(true);
      
      // Create a URL for the uploaded file
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageChange(result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuickSelect = () => {
    // Provide some quick avatar options
    const avatarOptions = [
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=200&h=200&auto=format&fit=crop&ixlib=rb-4.1.0',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop&ixlib=rb-4.1.0',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop&ixlib=rb-4.1.0',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop&ixlib=rb-4.1.0',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop&ixlib=rb-4.1.0',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&auto=format&fit=crop&ixlib=rb-4.1.0'
    ];
    
    const currentIndex = avatarOptions.indexOf(src);
    const nextIndex = (currentIndex + 1) % avatarOptions.length;
    onImageChange?.(avatarOptions[nextIndex]);
  };

  return (
    <motion.div
      className="relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative w-24 h-24 md:w-28 md:h-28">
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full rounded-full object-cover border-4 border-white/20 shadow-[0_0_30px_rgba(167,139,250,0.3)]"
            onError={(e) => {
              // Fallback to default avatar if image fails to load
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop&ixlib=rb-4.1.0';
            }}
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-4 border-white/20 shadow-[0_0_30px_rgba(167,139,250,0.3)] flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
        )}
        
        {isEditable && (
          <motion.button
            onClick={handleImageUpload}
            className="absolute inset-0 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
            whileTap={{ scale: 0.95 }}
            disabled={isUploading}
          >
            {isUploading ? (
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <Camera className="w-6 h-6 text-white" />
            )}
          </motion.button>
        )}
        
        {isEditable && (
          <div className="absolute -bottom-1 -right-1 flex gap-1">
            <motion.button
              onClick={handleImageUpload}
              className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ 
                boxShadow: isHovered 
                  ? '0 0 20px rgba(167,139,250,0.6)' 
                  : '0 0 10px rgba(167,139,250,0.3)' 
              }}
              title="Upload from device"
              disabled={isUploading}
            >
              <Upload className="w-4 h-4 text-white" />
            </motion.button>
            
            <motion.button
              onClick={handleQuickSelect}
              className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ 
                boxShadow: isHovered 
                  ? '0 0 20px rgba(99,102,241,0.6)' 
                  : '0 0 10px rgba(99,102,241,0.3)' 
              }}
              title="Choose avatar"
            >
              <User className="w-4 h-4 text-white" />
            </motion.button>
          </div>
        )}
      </div>
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </motion.div>
  );
};

export default ProfilePicture;