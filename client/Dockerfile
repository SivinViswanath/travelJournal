# ---- Build Stage ----
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Build the Vite app for production
RUN npm run build


# ---- Production Stage ----
FROM nginx:alpine

# Copy the built files from builder to nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start nginx automatically
CMD ["nginx", "-g", "daemon off;"]
