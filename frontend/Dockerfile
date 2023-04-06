FROM node:14
WORKDIR /frontend
COPY ./package*.json ./
RUN npm i
COPY . .
EXPOSE 8089
#CMD ["npm", "run"]
#RUN npm run serve
#CMD ["npm serve --port 8081"]
#CMD npm run serve -- --public 0.0.0.0:8089
CMD npm run serve