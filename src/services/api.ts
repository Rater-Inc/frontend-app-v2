const BASE_URL = 'your-api-url';

export const api = {
  verifyPassword: async (spaceId: string, password: string) => {
    const response = await fetch(`${BASE_URL}/spaces/${spaceId}/verify`, {
      method: 'POST',
      body: JSON.stringify({ password })
    });
    if (!response.ok) throw new Error('Invalid password');
    return response.json();
  },

  verifyToken: async (token: string) => {
    const response = await fetch(`${BASE_URL}/verify-token`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.ok;
  }
};