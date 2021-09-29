FROM node:12
WORKDIR /app
COPY . /app
RUN ["npm", "install"]
EXPOSE 5000
ENTRYPOINT ["npm", "run", "start:dev"]