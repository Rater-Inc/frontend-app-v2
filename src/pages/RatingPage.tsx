import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import RatingSlider from '../components/Rating/RatingStars';

// Mock data - replace with actual data from your backend
const mockMembers = [
  { id: 1, name: 'Alex Johnson' },
  { id: 2, name: 'Sarah Williams' },
  { id: 3, name: 'Mike Chen' },
];

const mockMetrics = [
  { id: 1, name: 'Teamwork', description: 'Ability to work with others', maxScore: 10 },
  { id: 2, name: 'Communication', description: 'Clear and effective communication', maxScore: 10 },
  { id: 3, name: 'Leadership', description: 'Taking initiative and guiding others', maxScore: 10 },
];

const RatingPage = () => {
  const navigate = useNavigate();
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentMember = mockMembers[currentMemberIndex];

  const handleRatingChange = (metricId: number, value: number) => {
    setRatings(prev => ({
      ...prev,
      [`${currentMember.id}-${metricId}`]: value,
    }));
  };

  const handleNext = () => {
    if (currentMemberIndex < mockMembers.length - 1) {
      setCurrentMemberIndex(prev => prev + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handleBack = () => {
    setCurrentMemberIndex(prev => Math.max(0, prev - 1));
  };

  const isLastMember = currentMemberIndex === mockMembers.length - 1;
  const hasAllRatings = mockMetrics.every(
    metric => ratings[`${currentMember.id}-${metric.id}`] !== undefined
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="h-10 w-10 text-green-600 fill-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ratings Submitted Successfully!</h2>
          <p className="text-gray-600 mb-8">Thank you for rating your team members.</p>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate('/results/overall')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              View Overall Results
            </button>
            <button
              onClick={() => navigate('/results/individual')}
              className="px-6 py-3 border-2 border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-all duration-300"
            >
              View Individual Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Rate Performance</h2>
            <p className="text-sm text-gray-500">
              Member {currentMemberIndex + 1} of {mockMembers.length}
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900">{currentMember.name}</h3>
          </div>

          <div className="space-y-8">
            {mockMetrics.map(metric => (
              <div key={metric.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">{metric.name}</h4>
                    <p className="text-sm text-gray-500">{metric.description}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">
                      {ratings[`${currentMember.id}-${metric.id}`] || 0}
                    </span>
                    <span className="text-gray-400">/ {metric.maxScore}</span>
                  </div>
                </div>
                <RatingSlider
                  max={metric.maxScore}
                  value={ratings[`${currentMember.id}-${metric.id}`] || 0}
                  onChange={(value) => handleRatingChange(metric.id, value)}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentMemberIndex === 0}
              className="px-6 py-2 flex items-center gap-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!hasAllRatings}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
            >
              {isLastMember ? 'Submit' : 'Next'}
              {!isLastMember && <ChevronRight className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingPage;