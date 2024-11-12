# BistroMoods Frontend

## Project Description

BistroMoods is a web application designed to help users discover NYC restaurants based on their mood. By leveraging our database of moods and resturants, BistroMoods offers personalized dining recommendations, allowing users to find the perfect spot for any occasion or vibe.

This repository contains the **frontend codebase** for BistroMoods, built with JavaScript to provide a seamless user interface and responsive design. The frontend handles all client-side logic, including user interactions, navigation, and dynamic rendering of restaurant data from the backend API. The backend, which manages data and API requests, is maintained in a separate repository.

## Component Documentation

### Key Components

1. **Home Page**  
   - Displays introductory content and search functionality for restaurant suggestions
  
2. **Restaurant Search**  
   - Allows users to filter restaurants by ambiance, price range, and cuisine type
  
3. **Restaurant Details**  
   - Displays selected restaurant's details, including address, Yelp rating, cusine, and ambiance
  
4. **Mood Filter**  
   - Provides a visual way to select mood preferences, influencing the restaurant recommendations shown to users

5. **Navigation Bar**  
   - Allows easy access to the main pages (Home, Search, Favorites, and Profile)

6. **Profile & Favorites**  
   - Lets users save favorite restaurants and manage their dining preferences

## API Endpoints
1. ***User Sign-Up***
- Endpoint: POST /users/
- Description: Creates a new user account.
- Request Body:
 ```json
{
  "Username": "string",
  "Email": "string",
  "Password": "string",
  "Preferences": {"key": "value"}  
}
 ```
- Response:
  - 200 OK: Returns the created user details.
  - 400 Bad Request: Username is already registered.
    
2. ***User Login***
- Endpoint: POST /login/
- Description: Authenticates a user with email and password.
- Request Body:
```json
{
  "Email": "string",
  "Password": "string"
}
```
- Response:
  - 200 OK: { "message": "Login successful" }
  - 400 Bad Request: Invalid email or password.
    
3. ***Keyword Search***
- Endpoint: GET /restaurants/search/
- Description: Searches for restaurants based on a keyword match in CuisineType or MoodName.
- Query Parameter:
  - keyword: The search keyword.
- Response:
  - 200 OK: Returns a list of matching restaurants.
  - 404 Not Found: No restaurants match the search criteria.

These endpoints support the core functionality of the frontend, enabling account management and mood-based restaurant recommendations.

## Setup Instructions

### Prerequisites

- **Node.js** and **npm**: Ensure Node.js and npm are installed on your system

### Installation Steps

1. **Clone the Repository**
   ```
   git clone https://github.com/aysa2018/bistromoods_frontend.git

   cd bistromoods_frontend
   ```
   
2. **Install Dependencies**
   ```
   npm install
   ```
   
3. **Configure Environment Variables**
    -  Create a .env file in the root directory
    - add the following enviornment variable:
      ```
      REACT_APP_API_BASE_URL=http://localhost:8000  # Adjust if your backend server runs on a different URL
      ```
      
4. **Run the Application**
   ```
   npm start
   ```
   
6. **Access the App**
   - Open your browser and go to http://localhost:3000 to see BistroMoods in action

## Development Process
These design and technical choices were made with the user in mind. Our top priority was to create a frcitionless site that allows users to quickly and easily identify resturants perfectly suited to his or her mood. 

1. **Design Decisions**
   
     - User-Centric UI/UX:
       Designed for ease of use with clean navigation and minimalistic visuals, focusing on providing users with quick and relevant restaurant recommendations.

     - Responsive Layout:
         Ensured mobile compatibility for users on the go, using a responsive layout across all components.

     - Mood-Based Filtering:
         Implemented unique mood-based filtering to offer a personalized dining experience beyond typical search parameters.

2. **Technical Choices**
   - Framework: Chose React for component-based architecture, reactivity, and a large ecosystem.
   - State Management: Used Redux to handle app-wide state, particularly for user preferences, selected filters, and favorites.
   - API Integration: Leveraged the Yelp Fusion API to source restaurant data, including ratings, ambiance, and location.
   - Styling: Styled components were chosen for isolated styling, keeping the UI modular and maintainable 

## AI Usage
The BistroMoods frontend was developed with the assistance of OpenAI’s AI capabilities. Here’s how AI contributed to various parts of the development process:

1. Component Planning:
AI provided guidance in breaking down the application into manageable React components, focusing on logical separation of concerns and clear data flow between components.
2. Mock Data Structuring:
AI helped structure the mock data in a way that reflects the expected data from the backend API, ensuring a smoother transition to real API integration in the future.
3. Login and Homepage Styling
AI helped for a base-style of the login page and the homepage, which was modified to our liking.

## Figma Wireframe Link
https://www.figma.com/design/jOsQ3qwMC2oE0SdxLXI8yB/ppds_final?node-id=0-1&node-type=canvas&t=mdI9kGcN38dCQbIa-0
