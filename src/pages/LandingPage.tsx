import { useNavigate } from 'react-router-dom';
import { Star, Users, ArrowRight } from 'lucide-react';
import ActionButton from '../components/ActionButton';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 max-w-2xl w-full mx-auto">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-4 mb-2">
            <Star className="w-full h-full text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              Rater
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Create private spaces, rate activities with friends, and track everyone's progress in a fun, engaging way.
          </p>

          <div className="space-y-4 pt-4">
            <ActionButton
              onClick={() => navigate('/create-space')}
              icon={<Users className="h-5 w-5" />}
              variant="primary"
            >
              Create New Space
            </ActionButton>

            <ActionButton
              onClick={() => navigate('/enter-space')}
              icon={<ArrowRight className="h-5 w-5" />}
              variant="secondary"
            >
              Join Existing Space
            </ActionButton>
          </div>

          <p className="text-sm text-gray-500 mt-8">
            Join thousands of groups already using Rater to grow together
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;