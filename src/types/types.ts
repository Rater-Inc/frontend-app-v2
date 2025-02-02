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

export type Metric = {
    metricId: number;
    name: string;
    description: string;
}

export type Participant = {
    participantId: number;
    participantName: string;
}

export type RatingDetails = {
    rateeId: number,
    metricId: number,
    score: number
}

export type Rating = {
    raterNickName: string,
    spaceId: number,
    ratingDetails: RatingDetails[]
}
