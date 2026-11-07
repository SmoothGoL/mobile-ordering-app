# Stage 1: Build the React application
FROM node:24-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Install dependencies using npm ci for reliable, clean installs
RUN npm ci

# Copy the rest of your application code
COPY . .

# Build the Vite app (outputs to the dist/ folder)
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the built static files from the build stage to Nginx's serving directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
