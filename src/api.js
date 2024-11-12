// src/api.js
export const searchRestaurantsByKeyword = async (keyword) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/restaurants/search/?keyword=${encodeURIComponent(keyword)}`);
        if (!response.ok) {
            throw new Error("No restaurants found for the given keyword");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        return [];
    }
};
