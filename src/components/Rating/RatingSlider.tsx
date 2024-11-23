import React from 'react';

interface RatingSliderProps {
  max: number;
  value: number;
  onChange: (value: number) => void;
}

const RatingSlider: React.FC<RatingSliderProps> = ({ max, value, onChange }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="relative">
      <input
        type="range"
        min="0"
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #9333ea ${percentage}%, #e5e7eb ${percentage}%)`,
        }}
      />
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-500">0</span>
        <span className="text-xs text-gray-500">{max}</span>
      </div>
    </div>
  );
};

export default RatingSlider;