import { api } from './api';
import { storage } from './storage';

export const space = {
  getSpace: async (spaceId: string, token: string) => {
    try {
      const spaceInfo = storage.getSpaceInfo();
      if (spaceInfo[spaceId]) {
        return spaceInfo[spaceId].spaceData;
      }

      const response = await api.getSpace(spaceId, token);
      if (response?.status === 200) {
        const spaceData = response.data;
        spaceInfo[spaceId] = { spaceData, timestamp: Date.now() };
        localStorage.setItem('space-info', JSON.stringify(spaceInfo));
        return spaceData;
      }
      throw new Error('Invalid space');
    } catch (error) {
      console.error('Error getting space:', error);
      return null;
    }
  },
};
