const withOffline = require('next-offline')
const { URL } = require('./config')

module.exports = {
  useFileSystemPublicRoutes: false,
  publicRuntimeConfig: {
    URL
  },
  ...withOffline()
}
