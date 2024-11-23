import React from 'react';

interface ActionButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  icon,
  variant = 'primary',
  onClick,
}) => {
  const baseStyles = "w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5";
  
  const variants = {
    primary: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/25",
    secondary: "bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-500/10"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};

export default ActionButton;