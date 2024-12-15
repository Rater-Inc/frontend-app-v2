import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
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

const IndividualResultsPage = () => {
  const navigate = useNavigate();
  const { spaceId } = useParams();
  
  const [selectedMember, setSelectedMember] = useState(mockResults.members[0]);

  const getChartData = (member: typeof selectedMember) => ({
    labels: mockResults.metrics,
    datasets: [
      {
        label: member.name,
        data: mockResults.metrics.map(
          metric => member.scores[metric.toLowerCase() as keyof typeof member.scores]
        ),
        backgroundColor: 'rgba(147, 51, 234, 0.2)',
        borderColor: 'rgba(147, 51, 234, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(147, 51, 234, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(147, 51, 234, 1)',
      },
    ],
  });

  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(`/space/${spaceId}/results/overall`)}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Overall Results
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <User className="h-8 w-8 text-purple-600" />
            Individual Performance
          </h1>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Member</h3>
              <div className="space-y-4">
                {mockResults.members.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      selectedMember.id === member.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="font-medium">{member.name}</p>
                    <p className={`text-sm ${
                      selectedMember.id === member.id ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      Average Score: {
                        (Object.values(member.scores).reduce((a, b) => a + b, 0) / mockResults.metrics.length).toFixed(1)
                      }/10
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="md:w-2/3">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Radar</h3>
                <div className="aspect-square">
                  <Radar data={getChartData(selectedMember)} options={chartOptions} />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                {mockResults.metrics.map((metric) => (
                  <div key={metric} className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-900">{metric}</h4>
                    <p className="text-2xl font-bold text-purple-600">
                      {selectedMember.scores[metric.toLowerCase() as keyof typeof selectedMember.scores]}/10
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualResultsPage;