export const spaceAuth = {
  setToken: (spaceId: string, token: string) => {
    const auth = JSON.parse(localStorage.getItem('space-auth') || '{}');
    auth[spaceId] = { token, timestamp: Date.now() };
    localStorage.setItem('space-auth', JSON.stringify(auth));
  },

  getToken: (spaceId: string) => {
    const auth = JSON.parse(localStorage.getItem('space-auth') || '{}');
    return auth[spaceId]?.token;
  },

  removeToken: (spaceId: string) => {
    const auth = JSON.parse(localStorage.getItem('space-auth') || '{}');
    delete auth[spaceId];
    localStorage.setItem('space-auth', JSON.stringify(auth));
  },

  verifyPassword: async (spaceId: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (password === "test123") {
      const mockToken = `mock-token-${spaceId}-${Date.now()}`;
      return { token: mockToken };
    }
    throw new Error('Invalid password');
  }
};