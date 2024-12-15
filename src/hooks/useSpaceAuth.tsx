import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthState, AuthenticatedSpace } from "../types/types";

const AUTH_STORAGE_KEY = "authenticatedSpaces";
const AUTH_EXPIRY_HOURS = 24;

export const useSpaceAuth = (spaceId: string) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        isLoading: true,
        error: null,
    });

    const getStoredSpaces = useCallback((): AuthenticatedSpace[] => {
        try {
            return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || "[]");
        } catch {
            return [];
        }
    }, []);

    const isAuthenticated = useCallback(() => {
        const spaces = getStoredSpaces();
        const space = spaces.find((s) => s.spaceId === spaceId);

        if (!space) return false;

        // Check if authentication has expired
        if (Date.now() > space.expiresAt) {
            // Remove expired space
            const updatedSpaces = spaces.filter((s) => s.spaceId !== spaceId);
            localStorage.setItem(
                AUTH_STORAGE_KEY,
                JSON.stringify(updatedSpaces)
            );
            return false;
        }

        return true;
    }, [spaceId, getStoredSpaces]);

    const authenticateSpace = useCallback(
        async (password: string): Promise<void> => {
            try {
                setAuthState((prev) => ({
                    ...prev,
                    isLoading: true,
                    error: null,
                }));

                // Simulate API call to validate password
                await new Promise((resolve) => setTimeout(resolve, 500));

                // In production, you would validate the password here
                if (!password) throw new Error("Password is required");
                if (password.length < 6) throw new Error("Invalid password");

                const now = Date.now();
                const newSpace: AuthenticatedSpace = {
                    spaceId,
                    authenticatedAt: now,
                    expiresAt: now + AUTH_EXPIRY_HOURS * 60 * 60 * 1000,
                };

                const spaces = getStoredSpaces();
                const updatedSpaces = [
                    ...spaces.filter((s) => s.spaceId !== spaceId),
                    newSpace,
                ];

                localStorage.setItem(
                    AUTH_STORAGE_KEY,
                    JSON.stringify(updatedSpaces)
                );
                setAuthState({
                    isAuthenticated: true,
                    isLoading: false,
                    error: null,
                });
            } catch (error) {
                setAuthState({
                    isAuthenticated: false,
                    isLoading: false,
                    error:
                        error instanceof Error
                            ? error.message
                            : "Authentication failed",
                });
                throw error;
            }
        },
        [spaceId, getStoredSpaces]
    );

    const logout = useCallback(() => {
        const spaces = getStoredSpaces();
        const updatedSpaces = spaces.filter((s) => s.spaceId !== spaceId);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedSpaces));
        setAuthState({ isAuthenticated: false, isLoading: false, error: null });
        navigate("/");
    }, [spaceId, navigate, getStoredSpaces]);

    useEffect(() => {
        const checkAuth = () => {
            const authenticated = isAuthenticated();
            setAuthState((prev) => ({
                ...prev,
                isAuthenticated: authenticated,
                isLoading: false,
            }));

            if (!authenticated) {
                navigate(`/join/${spaceId}`, {
                    replace: true,
                    state: { from: location },
                });
            }
        };

        checkAuth();
    }, [spaceId, navigate, location, isAuthenticated]);

    return {
        ...authState,
        authenticateSpace,
        logout,
    };
};

export default useSpaceAuth;
