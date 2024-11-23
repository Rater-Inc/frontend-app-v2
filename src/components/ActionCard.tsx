import React from 'react';

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  onClick: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon,
  gradient,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-6 rounded-xl bg-gradient-to-r ${gradient} text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="bg-white/20 rounded-full p-4 backdrop-blur-sm mb-4">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-white/80">{description}</p>
      </div>
    </button>
  );
};

export default ActionCard;