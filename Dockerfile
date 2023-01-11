# Use the official Node.js image as the base
FROM node:latest

# Create a directory for our app and set it as the working directory
RUN mkdir -p /app
WORKDIR /app

#Expose ports 5000 for Nest server and 3000 for react server
EXPOSE 8080
EXPOSE 5000 
EXPOSE 3000

# Download the folder from the Git repo and extract it to a folder called transactions
RUN git clone https://github.com/ayo-nci/transaction.git && \
    unzip yourrepo.zip -d transactions

# Change directory to the transactions folder
WORKDIR /app/transactions

# Run npm install to install dependencies
RUN npm install

# Run npm start
RUN npm run start

# Change directory to the ratewidget folder
WORKDIR /app/ratewidget

# Run npm start
RUN npm start
