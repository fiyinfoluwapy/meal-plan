import React from 'react';

const Button = ({ children, size = 'md', variant = 'primary' }) => {
  const buttonStyles = {
    primary: 'bg-[#E89434] text-white hover:bg-[#D77F2E]',
    outline: 'border-[#E89434] text-[#E89434] hover:bg-[#E89434] hover:text-white',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-lg',
    lg: 'px-8 py-4 text-xl',
  };

  return (
    <button
      className={`rounded-lg ${buttonStyles[variant]} ${sizeStyles[size]} transition duration-300`}
    >
      {children}
    </button>
  );
};

export default Button;
