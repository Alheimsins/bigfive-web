const jwt = require('express-jwt')
const secret = require('../../config').JWT_SECRET

const getTokenFromHeader = req => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') {
    return req.headers.authorization.split(' ')[1]
  }
  return null
}

const auth = {
  required: jwt({
    secret: secret,
    userProperty: 'payload',
    getToken: getTokenFromHeader,
    algorithms: ['RS256']
  }),
  optional: jwt({
    secret: secret,
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader,
    algorithms: ['RS256']
  })
}
module.exports = auth
