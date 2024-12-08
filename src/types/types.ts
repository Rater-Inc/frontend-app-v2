export type SpaceData = {
  name: string;
  description: string;
  password: string;
  metrics: Array<{ name: string; description: string }>;
  participants: Array<{ participantName: string }>;
  creatorNickname: string;
};
