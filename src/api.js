// src/api.js
export const searchRestaurantsByKeyword = async (keyword, filters) => {
    const params = new URLSearchParams();

    if (keyword) params.append("keyword", keyword);
    if (filters.price_range) params.append("price_range", filters.price_range);
    if (filters.distance_range) params.append("distance_range", filters.distance_range);
    if (filters.dietary_restriction) params.append("dietary_restriction", filters.dietary_restriction);
    if (filters.special_feature) params.append("special_feature", filters.special_feature);

    try {
        const response = await fetch(`http://127.0.0.1:8000/restaurants/search/?${params.toString()}`);
        if (!response.ok) {
            throw new Error("No restaurants found for the given filters");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        return [];
    }
};
