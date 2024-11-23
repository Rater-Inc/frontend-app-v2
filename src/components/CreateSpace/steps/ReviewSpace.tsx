import React from 'react';
import { Check } from 'lucide-react';
import { SpaceData } from '../CreateSpaceModal';

interface ReviewSpaceProps {
  data: SpaceData;
  onBack: () => void;
  onSubmit: () => void;
}

const ReviewSpace: React.FC<ReviewSpaceProps> = ({ data, onBack, onSubmit }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Space Details</h3>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="text-gray-500">Name:</span>{' '}
              <span className="text-gray-900">{data.name}</span>
            </p>
            <p className="text-sm">
              <span className="text-gray-500">Description:</span>{' '}
              <span className="text-gray-900">{data.description}</span>
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Rating Metrics</h3>
          <div className="space-y-2">
            {data.metrics.map((metric, index) => (
              <div key={index} className="text-sm">
                <span className="text-gray-900 font-medium">{metric.name}</span>
                <span className="text-gray-500"> - {metric.description}</span>
                <span className="text-gray-500"> (Max: {metric.maxScore})</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Members ({data.members.length})</h3>
          <div className="space-y-2">
            {data.members.map((member, index) => (
              <div key={index} className="text-sm">
                <span className="text-gray-900">{member.name}</span>
                <span className="text-gray-500"> - {member.email}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <Check className="h-4 w-4" />
          Create Space
        </button>
      </div>
    </div>
  );
};

export default ReviewSpace;