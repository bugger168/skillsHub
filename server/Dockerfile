# SkillsHub API Server
FROM node:18-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --production

COPY server.js ./
COPY skills.json ./skills.json

EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js"]