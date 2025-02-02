import { useEffect,useState  } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import RatingSlider from '../components/Rating/RatingStars';
import { api , submitRatings } from '../services/api';
import { Metric , Participant, RatingDetails , Rating} from '../types/types';
import { spaceAuth } from '../services/auth';
import { space } from '../services/space';

const RatingPage = () => {
  const navigate = useNavigate();
  const { spaceId } = useParams();

  const [currentParticipantIndex, setcurrentParticipantIndex] = useState(0);
  // const [ratings, setRatings] = useState<Record<string, number>>({});
  const [ratings, setRatings] = useState<RatingDetails[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [spaceRecordId,setSpaceRecordId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!spaceId) return;

      const spaceData = await space.getSpace(
        spaceId,
        spaceAuth.getToken(spaceId)
      );
      if (spaceData) {
        setMetrics(spaceData.metrics);
        setParticipants(spaceData.participants);
        setSpaceRecordId(spaceData.spaceId);
      }
    };

    if (spaceId) {
      fetchData();
    }
  }, [spaceId]);

  const currentParticipant = participants[currentParticipantIndex] || null;

  const handleRatingChange = (metricId: number, value: number) => {
    const ratingdetails: RatingDetails = {
      rateeId: currentParticipant.participantId,
      metricId: metricId,
      score: value,
    };
    setRatings((prev) => {
      const updatedRatings = prev.filter(
        (r) =>
          !(
            r.metricId === metricId &&
            r.rateeId === currentParticipant.participantId
          )
      );
      return [...updatedRatings, ratingdetails];
    });
  };

  const handleNext = () => {
    if (currentParticipantIndex < participants.length - 1) {
      setcurrentParticipantIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const rating: Rating = {
        raterNickName: 'rater',
        spaceId: spaceRecordId,
        ratingDetails: ratings,
      };

      if (!spaceId) return;
      const response = await submitRatings(rating, spaceAuth.getToken(spaceId));
      if (response) {
        setIsSubmitted(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error submitting ratings:', error);
    }
  };

  const handleBack = () => {
    setcurrentParticipantIndex((prev) => Math.max(0, prev - 1));
  };

  const isLastMember = currentParticipantIndex === participants.length - 1;

  const hasAllRatings = metrics.every((metric) =>
    ratings.some(
      (rating) =>
        rating.metricId === metric.metricId &&
        rating.rateeId === currentParticipant?.participantId
    )
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="h-10 w-10 text-green-600 fill-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ratings Submitted Successfully!
          </h2>
          <p className="text-gray-600 mb-8">
            Thank you for rating your team members.
          </p>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate(`/space/${spaceId}/results/overall`)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              View Overall Results
            </button>
            <button
              onClick={() => navigate(`/space/${spaceId}/results/individual`)}
              className="px-6 py-3 border-2 border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-all duration-300"
            >
              View Individual Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Rate Performance
            </h2>
            <p className="text-sm text-gray-500">
              Member {currentParticipantIndex + 1} of {participants.length}
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900">
              {currentParticipant?.participantName}
            </h3>
          </div>

          <div className="space-y-8">
            {metrics.map((metric) => (
              <div key={metric.metricId} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">{metric.name}</h4>
                    <p className="text-sm text-gray-500">
                      {metric.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">
                      {ratings.find(
                        (e) =>
                          e.metricId === metric.metricId &&
                          e.rateeId === currentParticipant?.participantId
                      )?.score || 0}
                    </span>
                    <span className="text-gray-400">/ {5}</span>
                  </div>
                </div>
                <RatingSlider
                  max={5}
                  value={
                    ratings.find(
                      (e) =>
                        e.metricId === metric.metricId &&
                        e.rateeId === currentParticipant?.participantId
                    )?.score || 0
                  }
                  onChange={(value) =>
                    handleRatingChange(metric.metricId, value)
                  }
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentParticipantIndex === 0}
              className="px-6 py-2 flex items-center gap-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!hasAllRatings}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
            >
              {isLastMember
                ? isLoading
                  ? ''
                  : 'Submit'
                : isLoading
                  ? ''
                  : 'Next'}
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : null}
              {!isLastMember && <ChevronRight className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingPage;
