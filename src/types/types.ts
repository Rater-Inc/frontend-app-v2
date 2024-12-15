export type SpaceData = {
    name: string;
    description: string;
    password: string;
    metrics: Array<{ name: string; description: string }>;
    participants: Array<{ participantName: string }>;
    creatorNickname: string;
};

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
