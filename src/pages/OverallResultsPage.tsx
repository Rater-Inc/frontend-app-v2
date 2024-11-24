import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Medal, ArrowLeft, BarChart2 } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Mock data
const mockResults = {
  members: [
    { id: 1, name: 'Alex Johnson', scores: { teamwork: 9, communication: 8, leadership: 7 } },
    { id: 2, name: 'Sarah Williams', scores: { teamwork: 8, communication: 9, leadership: 9 } },
    { id: 3, name: 'Mike Chen', scores: { teamwork: 7, communication: 7, leadership: 8 } },
  ],
  metrics: ['Teamwork', 'Communication', 'Leadership'],
};

const OverallResultsPage = () => {
  const navigate = useNavigate();
  const [selectedMetric, setSelectedMetric] = useState('all');

  const getMetricWinner = (metric: string) => {
    return mockResults.members.reduce((prev, current) => {
      const prevScore = prev.scores[metric.toLowerCase() as keyof typeof prev.scores];
      const currentScore = current.scores[metric.toLowerCase() as keyof typeof current.scores];
      return prevScore > currentScore ? prev : current;
    });
  };

  const chartData = {
    labels: mockResults.members.map(m => m.name),
    datasets: mockResults.metrics.map((metric, index) => ({
      label: metric,
      data: mockResults.members.map(m => m.scores[metric.toLowerCase() as keyof typeof m.scores]),
      backgroundColor: [
        'rgba(147, 51, 234, 0.7)',
        'rgba(236, 72, 153, 0.7)',
        'rgba(59, 130, 246, 0.7)',
      ][index],
    })),
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Performance Comparison',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
      },
    },
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/rate')}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Ratings
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Trophy className="h-8 w-8 text-yellow-500" />
            Overall Results
          </h1>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {mockResults.metrics.map((metric) => {
              const winner = getMetricWinner(metric);
              return (
                <div
                  key={metric}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Medal className="h-5 w-5 text-yellow-500" />
                    {metric} Champion
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{winner.name}</p>
                      <p className="text-sm text-gray-500">Score: {winner.scores[metric.toLowerCase() as keyof typeof winner.scores]}/10</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gray-50 p-6 rounded-xl mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-purple-600" />
                Performance Chart
              </h3>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Metrics</option>
                {mockResults.metrics.map((metric) => (
                  <option key={metric} value={metric.toLowerCase()}>
                    {metric}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-[400px]">
              <Bar options={chartOptions} data={chartData} />
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/results/individual')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              View Individual Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallResultsPage;