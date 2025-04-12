# Use the official Node.js 20 slim image as the base image for building
FROM node:20-alpine AS builder

# Set the working directory in the builder stage
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Use a smaller base image for the final stage
FROM node:20-alpine AS prepare

# Set the working directory in the runtime stage
WORKDIR /usr/src/app

# Copy only the built application and necessary files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

# # Install only production dependencies
RUN npm ci --only=production

# Clean up unnecessary files to reduce image size
RUN rm -rf /usr/src/app/node_modules/.cache

FROM node:20-alpine AS runtime

# Set the working directory in the runtime stage
WORKDIR /usr/src/app

# Copy only the built application and necessary files from the prepare stage
COPY --from=prepare /usr/src/app/dist ./dist

# Expose the port the app runs on
EXPOSE 4000

# Define the command to run the application
CMD ["node", "dist/main.js"]