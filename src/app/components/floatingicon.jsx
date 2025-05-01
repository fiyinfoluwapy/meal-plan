import React from 'react';
import { motion } from 'framer-motion';

const FloatingIcon = ({ icon: Icon, className, initialX, initialY, duration }) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ x: initialX, y: initialY, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ duration: duration, ease: 'easeOut' }}
    >
      <Icon className="text-[#E89434] text-4xl" />
    </motion.div>
  );
};

export default FloatingIcon;
