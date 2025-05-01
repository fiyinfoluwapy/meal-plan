import React from 'react';
import { motion } from 'framer-motion';

const ImageSlice = ({ src, className, initial, animate, transition }) => {
  return (
    <motion.img
      src={src}
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}
      alt="Header Slice"
    />
  );
};

export default ImageSlice;
