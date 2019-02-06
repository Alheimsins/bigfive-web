###########################################################
#
# Dockerfile for bigfive-web
#
###########################################################

# Setting the base to nodejs 10
FROM mhart/alpine-node:10@sha256:f88175306954522da474a33913b3fe4afb9f03540535f1b5a4bcd57c30cb59f4

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
