import React, { useState } from "react";
import { Check, Link, Star, ChevronRight } from "lucide-react";
import { SpaceData } from "../../types/types";

import { useNavigate } from "react-router-dom";
import { createSpace } from "../../services/api";
import { spaceAuth } from "../../services/auth";
// import { create } from "domain";

interface ReviewSpaceProps {
  data: SpaceData;
  onBack: () => void;
}

const ReviewSpace: React.FC<ReviewSpaceProps> = ({
  data,
  onBack,
  // onSubmit,
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [spaceUrl, setSpaceUrl] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await createSpace(data);
      setSpaceUrl(response.link);
      const { token } = await spaceAuth.verifyPassword(response.link, data.password);
      spaceAuth.setToken(response.spaceId, token);
    } catch (error) {
      console.error("Failed to create space:", error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  if (spaceUrl) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-2">
            <Check className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Space Created Successfully!
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              Share this URL with your members:
            </p>
            <div className="flex items-center gap-2 bg-white p-3 rounded border">
              <Link className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                readOnly
                value={`https://example.com/space/${spaceUrl}`} // TODO: Replace with actual URL
                className="flex-1 bg-transparent outline-none text-sm"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(`/space/${spaceUrl}/rate`)}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <Star className="h-4 w-4" />
            Start Rating
          </button>
          <button
            onClick={() => navigate(`/space/${spaceUrl}/results/overall`)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
          >
            <ChevronRight className="h-4 w-4" />
            View Results
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Space Details</h3>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="text-gray-500">Name:</span>{" "}
              <span className="text-gray-900">{data.name}</span>
            </p>
            <p className="text-sm">
              <span className="text-gray-500">Description:</span>{" "}
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
                {/* <span className="text-gray-500"> (Max: {metric.maxScore})</span> */}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">
            Participants ({data.participants.length})
          </h3>
          <div className="space-y-2">
            {data.participants.map((participants, index) => (
              <div key={index} className="text-sm">
                <span className="text-gray-900">
                  {participants.participantName}
                </span>
                {/* <span className="text-gray-500"> - {participants.email}</span> */}
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
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              Create Space
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ReviewSpace;