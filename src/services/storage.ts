export const storage = {
  getSpaceInfo: () => {
    const space = JSON.parse(localStorage.getItem('space-info') || '{}');
    return space;
  },
};
