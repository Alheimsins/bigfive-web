module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'Gibberish, jibberish, jibber-jabber and gobbledygook',
  DB_CONNECTION: process.env.DB_CONNECTION || 'mongodb://localhost:27017/bigfive',
  DB_COLLECTION: process.env.DB_COLLECTION || 'results',
  URL: process.env.URL || 'http://localhost:3000'
}
