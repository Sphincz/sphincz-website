#syntax=docker/dockerfile:1.9

# Node.js base image for the frontend
FROM node:22.8.0-alpine AS node-builder
WORKDIR /app

# Copy package.json and lock file for installing dependencies
COPY package.json package-lock.json ./

# Install npm dependencies
RUN npm ci

# Copy the rest of the frontend source code
COPY . .

# Build the frontend application
RUN npm run build

# Expose port 3000 for development (if needed for a dev server)
EXPOSE 3000

# Default command for running the frontend in production
CMD ["npm", "start"]
