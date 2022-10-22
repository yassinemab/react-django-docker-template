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
    typescript @types/react @types/react-router-dom @types/react-dom webpack webpack-cli

# Install fontawesome packages
RUN npm install --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons \
    @fortawesome/react-fontawesome

# Install extra packages
RUN npm install --save react-bootstrap bootstrap js-cookie @types/react-notifications-component \
    react-notifications-component axios@0.24.0 sass

# Copy app
COPY . ./

# Start app
CMD ["npm", "start"]