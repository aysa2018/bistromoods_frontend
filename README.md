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
   - Displays selected restaurant's details, including address, Yelp rating, and a direct link to the resturant's Yelp page
  
4. **Mood Filter**  
   - Provides a visual way to select mood preferences, influencing the restaurant recommendations shown to users

5. **Navigation Bar**  
   - Allows easy access to the main pages (Home, Search, Favorites, and Profile)

6. **Profile & Favorites**  
   - Lets users save favorite restaurants and manage their dining preferences

## Setup Instructions

### Prerequisites

- **Node.js** and **npm**: Ensure Node.js and npm are installed on your system

### Installation Steps

1. **Clone the Repository**
   git clone https://github.com/aysa2018/bistromoods_frontend.git
   cd bistromoods_frontend
   
3. **Install Dependencies**
   npm install
   
5. **Configure Environment Variables**
    -  Create a .env file in the root directory
    - Add your API key 
   
4. **Run the Application**
   npm start
   
5. **Access the App**
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

