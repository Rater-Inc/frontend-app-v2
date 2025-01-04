import { api } from "./api";


export const space = {

    getSpace: async (spaceId: string, token: string) => {
        try {
            const space = JSON.parse(localStorage.getItem('space-info') || '{}');
            if (space[spaceId]) {
                return space[spaceId].spaceData;
            }

            const spaceData = await api.getSpace(spaceId, token);
            if (spaceData.success == true) {
                space[spaceId] = { spaceData, timestamp: Date.now() };
                localStorage.setItem('space-info', JSON.stringify(space));
                return spaceData;
            }
            throw new Error("Invalid space");
        }
        catch (error) {
            console.error("Error getting space:", error);
            return null;
        }
    }

}