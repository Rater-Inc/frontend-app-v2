import { useState , useEffect } from 'react';
import { useNavigate, useParams, useLocation} from 'react-router-dom';
import { Trophy, Medal, ArrowLeft, BarChart2 } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { space } from '../services/space';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { spaceAuth } from '../services/auth';
import { SpaceResultData } from '../types/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OverallResultsPage = () => {
  const navigate = useNavigate();
  const { spaceId } = useParams();
  const location = useLocation();
  const result = location.state?.spaceResultData;

  const [spaceResult, setSpaceResult] = useState<SpaceResultData>();
  const [selectedMetric, setSelectedMetric] = useState('all');

  useEffect(() => {
    const fetchSpaceResult = async () => {
      if (spaceId === undefined) return;
      try {
        const spaceResult = await space.getSpaceResult(spaceId, spaceAuth.getToken(spaceId));
        setSpaceResult(spaceResult);
      } catch (error) {
        console.error("Failed to fetch space result:", error);
        alert(error); // TODO : ALERT VISUALIZATION
      }
    };

    if (result) {
      setSpaceResult(result);
    } else {
      fetchSpaceResult();
    }
  }, [spaceId, result]);

  const chartData = {
    labels: spaceResult?.participantResults.map((p) => p.participantName) || [],
    datasets: spaceResult?.metricLeaders.map((metric, index) => ({
      label: metric.name,
      data: spaceResult.participantResults.map((p) => {
        const metricResult = p.metricResults.find((m) => m.metricId === metric.id);
        return metricResult ? metricResult.averageMetricScore : 0;
      }),
      backgroundColor: [
        "rgba(147, 51, 234, 0.7)",
        "rgba(236, 72, 153, 0.7)",
        "rgba(59, 130, 246, 0.7)",
      ][index % 3],
    })) || [],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Performance Comparison",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
      },
    },
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(`/space/${spaceId}/select-action`)}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Space
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Trophy className="h-8 w-8 text-yellow-500" />
            Overall Results
          </h1>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {spaceResult?.metricLeaders.map((metric) => {
              return (
                <div
                  key={metric.id}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Medal className="h-5 w-5 text-yellow-500" />
                    {metric.name} Champion
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{metric.leaderParticipant.participantName}</p>
                      <p className="text-sm text-gray-500">
                        Score:{" "}
                        {
                          metric.score.toFixed(1)
                          
                        }
                        /5
                      </p>
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
                {spaceResult?.metricLeaders.map((metric) => (
                  <option key={metric.id} value={metric.name.toLowerCase()}>
                    {metric.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-[400px] flex justify-center">
              <Bar options={chartOptions} data={chartData} />
            </div>
          </div>

          <div className="text-center">
            {spaceResult ? (<button
              onClick={() => navigate(`/space/${spaceId}/results/individual`, { state: { spaceResult } })} 
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              View Individual Results
            </button>) : (<button
              onClick={() => navigate(`/space/${spaceId}/results/individual`)} 
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              View Individual Results
            </button>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallResultsPage;
