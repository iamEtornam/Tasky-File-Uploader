FROM node:12.14.1
WORKDIR /app
COPY package.json /app
RUN npm install
EXPOSE 4000
COPY . /app
CMD ["npm", "start"]