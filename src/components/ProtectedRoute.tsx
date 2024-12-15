// components/ProtectedRoute.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { spaceAuth } from '../services/auth';
import {api} from '../services/api';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { spaceId } = useParams();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = spaceAuth.getToken(spaceId!);
    if (!token) {
      navigate(`/join/${spaceId}`, { state: { returnUrl: window.location.pathname } });
      return;
    }
    
    setIsAuthorized(true);
    // Verify token validity with API
    /*
    api.verifyToken(token).catch(() => {
      spaceAuth.removeToken(spaceId!);
      navigate(`/join/${spaceId}`);
    });
    */
  }, [spaceId]);

  return isAuthorized ? children : null;
};