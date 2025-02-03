import { useEffect, useState } from 'react';
import { useNavigate, useParams , useLocation } from 'react-router-dom';
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
import { space } from '../services/space';
import { spaceAuth } from '../services/auth';
import { SpaceResultData } from '../types/types';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const IndividualResultsPage = () => {
  const navigate = useNavigate();
  const { spaceId } = useParams();
  const location = useLocation();
  const spaceResult = location.state?.spaceResult;
  
  const [spaceResultData, setSpaceResultData] = useState<SpaceResultData>();
  const [selectedMember, setSelectedMember] = useState(spaceResultData?.participantResults[0]);

  useEffect(() => {
    const fetchSpaceResult = async () => {
      if (spaceId === undefined) return;
      const spaceResult = await space.getSpaceResult(spaceId,spaceAuth.getToken(spaceId));
      if (!spaceResult) return;
      setSpaceResultData(spaceResult);
    }
    
    if (!spaceResult) {
      fetchSpaceResult();
    }
    else {
      setSpaceResultData(spaceResult);
    }
    setSelectedMember(spaceResultData?.participantResults[0]);
  }, [spaceResultData,spaceId]);

  
  const getChartData = (member: typeof selectedMember) => ({
    labels: member?.metricResults.map(metric => metric.name),
    datasets: [
      {
        label: member?.participantName,
        data: member?.metricResults.map(metric => metric.averageMetricScore),
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
        suggestedMax: 5,
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
          onClick={() => navigate(`/space/${spaceId}/results/overall`, { state: { spaceResultData } })}
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
                {spaceResultData?.participantResults.map((member) => (
                  <button
                    key={member.participantId}
                    onClick={() => setSelectedMember(member)}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      selectedMember?.participantId === member.participantId
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="font-medium">{member.participantName}</p>
                    <p className={`text-sm ${
                      selectedMember?.participantId === member.participantId ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      Average Score: {
                        member.averageScore.toFixed(1)
                      }/5
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
                {spaceResultData?.metricLeaders.map((metric) => (
                  <div key={metric.id} className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-900">{metric.name}</h4>
                    <p className="text-2xl font-bold text-purple-600">
                      {selectedMember?.averageScore.toFixed(1)}/5
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