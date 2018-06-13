###########################################################
#
# Dockerfile for bigfive-web
#
###########################################################

# Setting the base to nodejs 10
FROM mhart/alpine-node:10@sha256:d81ab942799faf39807c7ad45023503dadc4ba069320848879ad3d70e6beef30

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
