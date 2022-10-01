# Stage 1
FROM node:16-alpine as node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . /usr/src/app
RUN npm install -g @angular/cli@14

# test
# RUN ng test --code-coverage --watch=false
# RUN ng e2e

# Run a security audit
RUN npm audit --production --audit-level=high --registry=https://registry.npmjs.org
# generate build
RUN npm run buildprod

# Stage 2
FROM nginxinc/nginx-unprivileged:stable-alpine
COPY --from=node /usr/src/app/dist/ui /usr/share/nginx/html/ui
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
