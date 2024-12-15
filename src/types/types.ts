export type SpaceData = {
  name: string;
  description: string;
  password: string;
  metrics: Array<{ name: string; description: string; maxScore: number }>;
  members: Array<{ name: string; email: string }>;
}

export type AuthenticatedSpace = {
  spaceId: string;
  authenticatedAt: number;
  expiresAt: number;
};

export type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};