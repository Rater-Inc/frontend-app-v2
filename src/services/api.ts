const BASE_URL = "your-api-url";
import axios from "axios";
import { Rating, SpaceData } from "../types/types";
const apiUrl = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a response interceptor
apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // If 401 Unauthorized, remove token from localStorage
            localStorage.removeItem("token");
        }
        return Promise.reject(error);
    }
);

export const api = {
    verifyPassword: async (spaceId: string, password: string) => {
        const response = await fetch(`${apiUrl}/spaces/${spaceId}/verify`, {
            method: "POST",
            body: JSON.stringify({ password }),
        });
        if (!response.ok) throw new Error("Invalid password");
        return response.json();
    },
    authenticateLink: async (link: string, password: string) => {
        const response = await fetch(`${apiUrl}/api/Auth?link=${link}&password=${password}`, {
            method: "POST",
        });
        if (!response.ok) throw new Error("Authentication failed");
        return response.json();
    },

    verifyToken: async (token: string) => {
        const response = await fetch(`${BASE_URL}/verify-token`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.ok;
    },

    getSpace: async (spaceLink: string | undefined , token: string) => {
        try {
            apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
            const response = await apiClient.post(`api/space/get-space?link=${spaceLink}`);
            return response;
        }
        catch (error) {
            console.error("Error getting space:", error);
            return null;
        }
    },
};

export const createSpace = async (spaceData: SpaceData) => {
    try {
        const response = await apiClient.post(
            "api/Space/create-space",
            spaceData
        );
        return response.data;
    } catch (error) {
        console.error("Error creating space:", error);
        return null; // or throw a custom error
    }
};

export const submitRatings = async (ratings: Rating , token: string) => {
    try {
        apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
        const response = await apiClient.post("api/Space/add-ratings", ratings);
        localStorage.setItem('space-info', JSON.stringify(response.data));
        return response.data;
    }
    catch (error) {
        console.error("Error submitting ratings:", error);
        return null;
    }
}
