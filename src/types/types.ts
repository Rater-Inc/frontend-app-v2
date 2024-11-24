export type SpaceData = {
  name: string;
  description: string;
  password: string;
  metrics: Array<{ name: string; description: string; maxScore: number }>;
  members: Array<{ name: string; email: string }>;
}