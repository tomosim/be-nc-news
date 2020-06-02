# build from node
FROM node

# set default work directory instead of using root
WORKDIR /app

# copy package.json et al 
COPY package*.json ./

# clone wait-for-it script
RUN git clone https://github.com/vishnubob/wait-for-it.git

# install node modules
RUN npm install

# copy eveything else
COPY . .

# run start script
CMD ["npm", "start"]