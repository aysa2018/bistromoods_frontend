// API function to search restaurants using user input and filters
export const searchRestaurantsByUserInput = async (userPrompt, filters) => {
    const params = new URLSearchParams(); // Create a query string object

    // Append user input and filters to the query string
    if (userPrompt) params.append("user_prompt", userPrompt); // Add user input
    if (filters.rating) params.append("rating", filters.rating); // Add rating filter
    if (filters.price_range) params.append("price_range", filters.price_range); // Add price range filter
    if (filters.dietary_restriction) params.append("dietary_restriction", filters.dietary_restriction); // Add dietary restriction filter
    if (filters.special_feature) params.append("special_feature", filters.special_feature);// Add special feature filter
    if (filters.neighborhoods) params.append("neighborhoods", filters.neighborhoods); // Add neighborhood filter

    try {
        // Make a GET request to the backend API with query string
        const response = await fetch(`https://bistromoods-886616041508.us-central1.run.app/restaurants/search/?${params.toString()}`);
        
        // Check if the response is OK (status 200)
        if (!response.ok) {
            throw new Error("No restaurants found for the given filters"); // Throw an error for failed requests
        }

        // Parse the response data as JSON
        return await response.json();
    } catch (error) {
        // Log the error to the console and return an empty array
        console.error("Error fetching restaurants:", error);
        return [];
    }
};
