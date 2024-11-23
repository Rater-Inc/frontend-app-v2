import React, { useState } from 'react';
import { X } from 'lucide-react';
import SpaceBasics from './steps/SpaceBasics';
import MetricsSetup from './steps/MetricsSetup';
import MembersSetup from './steps/MembersSetup';
import ReviewSpace from './steps/ReviewSpace';

interface CreateSpaceModalProps {
  onClose: () => void;
}

export type SpaceData = {
  name: string;
  description: string;
  password: string;
  metrics: Array<{ name: string; description: string; maxScore: number }>;
  members: Array<{ name: string; email: string }>;
}

const STEPS = ['Basics', 'Metrics', 'Members', 'Review'];

const CreateSpaceModal: React.FC<CreateSpaceModalProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [spaceData, setSpaceData] = useState<SpaceData>({
    name: '',
    description: '',
    password: '',
    metrics: [],
    members: []
  });

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const updateSpaceData = (data: Partial<SpaceData>) => {
    setSpaceData(prev => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <SpaceBasics data={spaceData} onUpdate={updateSpaceData} onNext={handleNext} />;
      case 1:
        return <MetricsSetup data={spaceData} onUpdate={updateSpaceData} onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <MembersSetup data={spaceData} onUpdate={updateSpaceData} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <ReviewSpace data={spaceData} onBack={handleBack} onSubmit={() => console.log('Submit:', spaceData)} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create New Space</h2>
            <p className="text-sm text-gray-500">Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep]}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6 flex gap-2">
            {STEPS.map((step, index) => (
              <div
                key={step}
                className="flex-1"
              >
                <div
                  className={`h-2 rounded-full ${
                    index <= currentStep
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                      : 'bg-gray-200'
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

export default CreateSpaceModal;