import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { KeyRound, ArrowLeft } from 'lucide-react';
import { spaceAuth } from '../services/auth';
import {api} from '../services/api';

const JoinSpacePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { spaceId } = useParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await spaceAuth.verifyPassword(spaceId!, password);
      spaceAuth.setToken(spaceId!, token);
      const returnUrl = location.state?.returnUrl || `/space/${spaceId}/select-action`;
      navigate(returnUrl);
    } catch (err) {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl p-8">
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-4 mb-4">
            <KeyRound className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Join Space</h1>
          <p className="text-gray-600 mt-2">Enter the space password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter space password"
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
          >
            Join Space
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinSpacePage;