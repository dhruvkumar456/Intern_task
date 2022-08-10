From node:16.3.0-alpine
WORKDIR /app
COPY ./package*.json /app
RUN npm install
COPY . /app
CMD ["npm","run","dev"]
EXPOSE 7070
