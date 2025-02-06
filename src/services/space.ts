import { PersistedSpaceData, Rating , SpaceResultData } from '../types/types';
import { api, submitRatings } from './api';
import { storage } from './storage';

export const space = {
  getSpace: async (spaceId: string, token: string): Promise<PersistedSpaceData> => {
      const spaceInfo = storage.getSpaceInfo();
      const spaceIdInfo = spaceInfo[spaceId]?.spaceData;
      if (spaceIdInfo) {
        return spaceIdInfo as PersistedSpaceData;
      }

      const response = await api.getSpace(spaceId, token);
      if (response?.status === 200) {
        const spaceData = response.data;
        spaceInfo[spaceId] = { 
          spaceData, 
          timestamp: Date.now(), 
          RatingData: spaceInfo[spaceId]?.RatingData || null
        };
        localStorage.setItem('space-info', JSON.stringify(spaceInfo));
        return spaceData as PersistedSpaceData;
      }
      throw new Error('Invalid space');
  },

  submitRating: async (rating : Rating , token:string , spaceLink : string) => {
    const response = await submitRatings(rating, token);
    if(response?.status === 200) {
      const spaceInfo = storage.getSpaceInfo();
      spaceInfo[spaceLink].RatingData = response.data;
      localStorage.setItem("space-info", JSON.stringify(spaceInfo));
      return response.data;
    }
    throw new Error("Error submitting rating");
  },

  getSpaceResult: async (spaceId:string,token:string): Promise<SpaceResultData | undefined> => {
      const spaceResult = await api.getSpaceResult(spaceId, token);
      if (spaceResult?.status === 200) {
        return spaceResult.data as SpaceResultData;
      }
      throw new Error('Invalid space result');
  }
};
