export type SpaceData = {
    name: string;
    description: string;
    password: string;
    metrics: Array<{ name: string; description: string }>;
    participants: Array<{ participantName: string }>;
    creatorNickname: string;
};

export type PersistedSpaceData = {
    spaceId: number;
    creatorId: number;
    name: string;
    description: string;
    isLocked: boolean;
    link:string;
    createdAt:Date;
    metrics: Metric[];
    participants: Participant[];
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

type MetricResult = {
    metricId: number;
    name: string;
    averageMetricScore: number;
  };
  
  export type ParticipantResult = {
    participantId: number;
    participantName: string;
    averageScore: number;
    metricResults: MetricResult[];
  };
  
  type LeaderParticipant = {
    participantId: number;
    participantName: string;
  };
  
  type MetricLeader = {
    id: number;
    name: string;
    score: number;
    leaderParticipant: LeaderParticipant;
  };
  
export type SpaceResultData = {
    spaceId: number;
    name: string;
    participantResults: ParticipantResult[];
    metricLeaders: MetricLeader[];
  };

  export type RatingData = {
    success: boolean;
    spaceId: number;
    ratingCount: number;
  }

  export type SpaceInfo = {
    spaceData:PersistedSpaceData;
    RatingData:RatingData;
    timestamp:number;
  }
  
  export type SpaceInfoCollection = {
    [key: string]: SpaceInfo;
  };
  
  
