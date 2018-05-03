const dev = process.env.NODE_ENV !== 'production'
if (dev) {
  require('dotenv').config()
}
const next = require('next')
const { send, json } = require('micro')
const mongo = require('mongojs')
const { parse: urlParse } = require('url')
const config = require('./config')
const redirect = (res, location, statusCode = 302) => { res.statusCode = statusCode; res.setHeader('Location', location); res.end() }
const validMongoId = id => /^[0-9a-fA-F]{24}$/.test(id)

const app = next({ dev })
const handle = app.getRequestHandler()

async function main (req, res) {
  const { pathname } = await urlParse(req.url, true)
  const db = mongo(config.DB_CONNECTION)
  const collection = db.collection(config.DB_COLLECTION)

  if (pathname === '/api/login') {
    return redirect(res, '/')
  } else if (pathname === '/api/save') {
    const result = await json(req)
    if (!result) throw new Error('Not valid data')
    collection.insert(result, (error, data) => {
      if (error) throw error
      send(res, 200, data)
    })
  } else if (pathname.includes('/api/get')) {
    const id = pathname.replace('/api/get/', '')
    if (!id || !validMongoId(id)) throw new Error('Not a valid id')
    collection.findOne({ _id: mongo.ObjectId(id) }, (error, data) => {
      if (error) throw error
      send(res, 200, data)
    })
  } else if (pathname.includes('/test')) {
    const id = pathname.replace('/test/', '')
    app.render(req, res, '/test', { lang: id })
  } else if (pathname.includes('/result')) {
    const id = pathname.replace('/result/', '')
    app.render(req, res, '/result', { id: id })
  } else {
    return handle(req, res)
  }
}

async function setup (handler) {
  await app.prepare()
  return handler
}

module.exports = setup(main)
