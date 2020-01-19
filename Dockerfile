FROM node:10-alpine
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm install
ADD .eslintrc.js .prettierrc.js tsconfig.json ./
ADD src ./src
RUN npm run build
RUN node ./dist/index.js
