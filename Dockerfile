FROM node:18-alpine

ENV PORT=8080
ENV HOST=0.0.0.0

EXPOSE 8080
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build


CMD ["npm", "run", "start"]
