import { SpaceInfoCollection } from "../types/types";

export const storage = {
  getSpaceInfo: (): SpaceInfoCollection => {
    const space = JSON.parse(localStorage.getItem('space-info') || '{}');
    return space as SpaceInfoCollection;
  },
};
