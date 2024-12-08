import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { SpaceData } from "../../../types/types";

interface ParticipantsSetupProps {
  data: SpaceData;
  onUpdate: (data: Partial<SpaceData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ParticipantsSetup: React.FC<ParticipantsSetupProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
}) => {
  const [newParticipant, setNewParticipant] = useState({ participantName: "" });

  const addParticipant = () => {
    if (newParticipant.participantName) {
      onUpdate({
        participants: [...data.participants, { ...newParticipant }],
      });
      setNewParticipant({ participantName: "" });
    }
  };

  const removeParticipant = (index: number) => {
    onUpdate({
      participants: data.participants.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.participants.length > 0) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg">
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Participant Name
            </label>
            <input
              type="text"
              value={newParticipant.participantName}
              onChange={(e) =>
                setNewParticipant((prev) => ({
                  ...prev,
                  participantName: e.target.value,
                }))
              }
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Full name"
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={newParticipant.email}
              onChange={(e) => setNewParticipant(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="email@example.com"
            />
          </div> */}
        </div>
        <button
          type="button"
          onClick={addParticipant}
          className="w-full py-2 flex items-center justify-center gap-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Participant
        </button>
      </div>

      <div className="space-y-4">
        {data.participants.map((participants, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg relative group">
            <button
              type="button"
              onClick={() => removeParticipant(index)}
              className="absolute right-2 top-2 p-1 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
            <h4 className="font-medium text-gray-900">
              {participants.participantName}
            </h4>
            {/* <p className="text-sm text-gray-600">{Participant.email}</p> */}
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
          disabled={data.participants.length === 0}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
        >
          Next Step
        </button>
      </div>
    </form>
  );
};

export default ParticipantsSetup;
