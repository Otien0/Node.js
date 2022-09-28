# Specify the base image
FROM node:alpine

# Set the working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy the package.json file
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Set the command to start the node server
CMD ["npm", "start"]

