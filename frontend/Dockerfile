# pull official base image
FROM node

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN mkdir ./node_modules
# COPY /node_modules/. ./node_modules/

RUN npm cache verify && npm install

# Install neccessary packages
RUN npm install --save @babel/core @babel/preset-env @babel/preset-react react-scripts babel-loader \
    react react-router-dom react-dom webpack webpack-cli

# Install fontawesome packages
RUN npm install --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons \
    @fortawesome/react-fontawesome react-bootstrap bootstrap js-cookie react-notifications-component

# Copy app
COPY . ./

# Start app
CMD ["npm", "start"]