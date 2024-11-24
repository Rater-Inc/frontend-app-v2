import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, BarChart2, ArrowLeft } from 'lucide-react';
import ActionCard from '../components/ActionCard';

const SelectionPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl p-8">
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Choose an Action</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <ActionCard
            title="Rate Members"
            description="Rate your team members' performance across different metrics"
            icon={<Star className="h-6 w-6 text-white" />}
            gradient="from-purple-600 to-purple-800"
            onClick={() => navigate('/rate')}
          />
          <ActionCard
            title="View Results"
            description="Check overall and individual performance results"
            icon={<BarChart2 className="h-6 w-6 text-white" />}
            gradient="from-pink-600 to-pink-800"
            onClick={() => navigate('/results/overall')}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectionPage;