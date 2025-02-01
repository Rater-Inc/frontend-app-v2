import { api } from "./api";

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
    var res = await api.authenticateLink(spaceId, password);
    if(res.success == true){
      spaceAuth.setToken(spaceId, res.jwtToken);
      return {token: res.jwtToken};
    }
    else {
      throw new Error('Invalid password');
    }
  }
};