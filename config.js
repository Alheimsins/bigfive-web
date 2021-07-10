module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'Gibberish, jibberish, jibber-jabber and gobbledygook',
  DB_CONNECTION: process.env.DB_CONNECTION || 'mongodb://localhost:27017/bigfive',
  DB_COLLECTION: process.env.DB_COLLECTION || 'results',
  USER_COLLECTION: process.env.USER_COLLECTION || 'users',
  URL: process.env.URL || 'http://localhost:3000',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || 'test',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || 'test'
}
