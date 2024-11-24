import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  max: number;
  value: number;
  onChange: (value: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({ max, value, onChange }) => {
  return (
    <div className="flex gap-1">
      {[...Array(max)].map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onChange(index + 1)}
          className="focus:outline-none"
        >
          <Star
            className={`h-6 w-6 transition-colors ${
              index < value
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300 hover:text-yellow-200'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default RatingStars;