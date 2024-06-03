# Base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

# Nginx image
FROM nginx:1.21.3-alpine

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*
RUN rm -rf /var/www/html/index.nginx-debian.html

# Copy Nginx config file
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY db.json /usr/share/nginx/html/db.json

# Copy built app to Nginx web root
COPY dist /usr/share/nginx/html

# Expose port
EXPOSE 3000

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]