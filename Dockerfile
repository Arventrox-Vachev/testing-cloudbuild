FROM node:18-alpine


EXPOSE 8080
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build


CMD ["npm", "run", "docker-start"]
