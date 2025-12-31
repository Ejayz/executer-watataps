# Use Node.js Alpine for a small image
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Run the cron app
CMD ["node", "index.js"]
