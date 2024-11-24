import React from 'react';

interface ActionButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  type,
  children,
  icon,
  variant = 'primary',
  disabled,
  onClick,
}) => {
  const baseStyles = "w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5";
  
  const variants = {
    primary: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/25",
    secondary: "bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-500/10"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};

export default ActionButton;