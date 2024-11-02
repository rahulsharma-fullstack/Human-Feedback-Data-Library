# Use the latest Node.js 22 image as the base
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to install dependencies
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the project for production
RUN npm run build

# Set the environment variable to specify the port
ENV PORT=8080

# Expose port 8080 to be accessible outside the container
EXPOSE 8080

# Start the application using the development server on port 8080
CMD ["npm", "run", "dev"]
