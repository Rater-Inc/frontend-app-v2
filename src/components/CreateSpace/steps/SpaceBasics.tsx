import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { SpaceData } from '../CreateSpaceModal';

interface SpaceBasicsProps {
  data: SpaceData;
  onUpdate: (data: Partial<SpaceData>) => void;
  onNext: () => void;
}

const SpaceBasics: React.FC<SpaceBasicsProps> = ({ data, onUpdate, onNext }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Space Name and Description fields remain unchanged */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Space Name
        </label>
        <input
          type="text"
          id="name"
          value={data.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="e.g., Weekend Basketball Group"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={data.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="What's this space about?"
          rows={3}
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Space Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={data.password}
            onChange={(e) => onUpdate({ password: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12"
            placeholder="Choose a password for your space"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Members will need this to join your space
        </p>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
        >
          Next Step
        </button>
      </div>
    </form>
  );
};

export default SpaceBasics;