###########################################################
#
# Dockerfile for bigfive-web
#
###########################################################

# Setting the base to nodejs 10
FROM mhart/alpine-node:10@sha256:607a6e1e75ca22a5aa090e055a86c35bf59823f5d8c5633613c61166526315df

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
