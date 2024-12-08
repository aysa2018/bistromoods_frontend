# Use official Nginx image to serve the React app
FROM nginx:alpine

# Set the working directory inside the container
WORKDIR /usr/share/nginx/html

# Copy the build output from the local machine to the container
COPY build/ .

# Copy custom Nginx configuration file (if needed)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 (default for Nginx)
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]