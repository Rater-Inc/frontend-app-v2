import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { SpaceData } from "../../../types/types";
// import { SpaceData } from "../CreateSpaceModal";

interface MetricsSetupProps {
  data: SpaceData;
  onUpdate: (data: Partial<SpaceData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const MetricsSetup: React.FC<MetricsSetupProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
}) => {
  const [newMetric, setNewMetric] = useState({
    name: "",
    description: "",
    maxScore: 10,
  });

  const addMetric = () => {
    if (newMetric.name && newMetric.description) {
      onUpdate({
        metrics: [...data.metrics, { ...newMetric }],
      });
      setNewMetric({ name: "", description: "", maxScore: 10 });
    }
  };

  const removeMetric = (index: number) => {
    onUpdate({
      metrics: data.metrics.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.metrics.length > 0) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg">
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Metric Name
            </label>
            <input
              type="text"
              value={newMetric.name}
              onChange={(e) =>
                setNewMetric((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., Teamwork"
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Score
            </label>
            <input
              type="number"
              value={newMetric.maxScore}
              onChange={(e) => setNewMetric(prev => ({ ...prev, maxScore: parseInt(e.target.value) }))}
              min="1"
              max="100"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div> */}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            value={newMetric.description}
            onChange={(e) =>
              setNewMetric((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="What does this metric measure?"
          />
        </div>
        <button
          type="button"
          onClick={addMetric}
          className="w-full py-2 flex items-center justify-center gap-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Metric
        </button>
      </div>

      <div className="space-y-4">
        {data.metrics.map((metric, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg relative group">
            <button
              type="button"
              onClick={() => removeMetric(index)}
              className="absolute right-2 top-2 p-1 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
            <h4 className="font-medium text-gray-900">{metric.name}</h4>
            <p className="text-sm text-gray-600">{metric.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              {/* Max score: {metric.maxScore} */}
              Max score : 5
            </p>
          </div>
        ))}
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
          type="submit"
          disabled={data.metrics.length === 0}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
        >
          Next Step
        </button>
      </div>
    </form>
  );
};

export default MetricsSetup;
