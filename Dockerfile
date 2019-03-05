###########################################################
#
# Dockerfile for bigfive-web
#
###########################################################

# Setting the base to nodejs 10
FROM mhart/alpine-node:10@sha256:6d2e5fe84ad17496f581ce263a761d19b216e6e3eff5c6eae005b8158d7cc68d

# Maintainer
MAINTAINER Jonas Enge

#### Begin setup ####

# Extra tools for native dependencies
RUN apk add --no-cache make gcc g++ python git

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

RUN npm run build

# Expose 3000
EXPOSE 3000

# Startup
ENTRYPOINT npm run start
