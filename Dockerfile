# Use the official Node.js image as base
FROM node:latest AS build

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json for server
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install dependencies for server and client
RUN cd server && npm install
RUN cd client && npm install

# Copy server and client code
COPY . .

# Build client code
RUN cd client && npm run build

# Copy frontend build to backend directory
RUN cp -r client/dist ./server/public

# Expose server port
EXPOSE 8080

# Start server
CMD ["node", "server/index.js"]
