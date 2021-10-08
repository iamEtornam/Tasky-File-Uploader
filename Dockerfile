FROM node:14.15.5
WORKDIR /app
COPY package.json /app
RUN npm install
EXPOSE 4000
COPY . /app
CMD ["npm", "start"]