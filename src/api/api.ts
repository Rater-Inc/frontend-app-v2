import axios from "axios";
import { SpaceData } from "../types/types";

const apiUrl = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createSpace = async (spaceData: SpaceData) => {
  try {
    const response = await apiClient.post("api/Space/create-space", spaceData);
    return response.data;
  } catch (error) {
    console.error("Error creating space:", error);
    return null; // or throw a custom error
  }
};
