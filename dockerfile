FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn install # --production
CMD ["yarn", "start", "--host", "--port", "80"] # Temporary because this starts the dev server
EXPOSE 80