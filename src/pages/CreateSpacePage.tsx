import React from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import SpaceBasics from "../components/CreateSpace/steps/SpaceBasics";
import MetricsSetup from "../components/CreateSpace/steps/MetricsSetup";
import MembersSetup from "../components/CreateSpace/steps/ParticipantSetup";
import ReviewSpace from "../components/CreateSpace/ReviewSpace";
import { SpaceData } from "../types/types";

const STEPS = ["Basics", "Metrics", "Members", "Review"];

const CreateSpacePage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [spaceData, setSpaceData] = React.useState<SpaceData>({
    name: "",
    description: "",
    password: "",
    metrics: [],
    participants: [],
    creatorNickname: "",
  });

  const handleNext = () =>
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const updateSpaceData = (data: Partial<SpaceData>) => {
    setSpaceData((prev) => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <SpaceBasics
            data={spaceData}
            onUpdate={updateSpaceData}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <MetricsSetup
            data={spaceData}
            onUpdate={updateSpaceData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <MembersSetup
            data={spaceData}
            onUpdate={updateSpaceData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <ReviewSpace
            data={spaceData}
            onBack={handleBack}
            onSubmit={() => navigate("/")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Create New Space
            </h2>
            <p className="text-sm text-gray-500">
              Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep]}
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 flex gap-2">
            {STEPS.map((step, index) => (
              <div key={step} className="flex-1">
                <div
                  className={`h-2 rounded-full ${
                    index <= currentStep
                      ? "bg-gradient-to-r from-purple-600 to-pink-600"
                      : "bg-gray-200"
                  }`}
                />
              </div>
            ))}
          </div>

          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default CreateSpacePage;
