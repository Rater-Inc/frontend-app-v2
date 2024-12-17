const BASE_URL = "your-api-url";
import axios from "axios";
import { SpaceData } from "../types/types";
const apiUrl = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  verifyPassword: async (spaceId: string, password: string) => {
    const response = await fetch(`${BASE_URL}/spaces/${spaceId}/verify`, {
      method: "POST",
      body: JSON.stringify({ password }),
    });
    if (!response.ok) throw new Error("Invalid password");
    return response.json();
  },

  verifyToken: async (token: string) => {
    const response = await fetch(`${BASE_URL}/verify-token`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.ok;
  },
};

export const authSpace = async (link: string | undefined, password: string) => {
  try {
    const response = await apiClient.post(
      `api/Auth?link=${link}&password=${password}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createSpace = async (spaceData: SpaceData) => {
  try {
    const response = await apiClient.post("api/Space/create-space", spaceData);
    return response.data;
  } catch (error) {
    console.error("Error creating space:", error);
    return null; // or throw a custom error
  }
};
