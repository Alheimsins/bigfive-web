###########################################################
#
# Dockerfile for bigfive-web
#
###########################################################

# Setting the base to nodejs 10
FROM mhart/alpine-node:10@sha256:74ccf977e92c92a17392d0615409f83ef035855805b9d3b63978d3fef4ff5696

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
