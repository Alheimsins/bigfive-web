const dev = process.env.NODE_ENV !== 'production'
if (dev) {
  require('dotenv').config()
}
const next = require('next')
const routes = require('./routes')
const mongo = require('mongojs')
const helmet = require('helmet')
const requestCountry = require('request-country')
const { JWT_SECRET, DB_CONNECTION, DB_COLLECTION, clientID, clientSecret, callbackURL } = require('./config')
const validMongoId = require('./lib/valid-mongoid')
const { join } = require('path')

const app = next({ dev })
const handler = routes.getRequestHandler(app)
const port = parseInt(process.env.PORT, 10) || 3000
const express = require('express')
const passport = require('passport')
const { Strategy } = require('passport-facebook')

app.prepare().then(() => {
  const server = express()
  const db = mongo(DB_CONNECTION)
  const collection = db.collection(DB_COLLECTION)

  server.use(helmet())
  server.use(express.json())
  server.use(require('cookie-parser')())
  server.use(require('body-parser').urlencoded({ extended: true }))
  server.use(require('express-session')({ secret: JWT_SECRET, resave: true, saveUninitialized: true }))
  server.use(requestCountry.middleware({ privateIpCountry: 'en' }))
  server.use(passport.initialize())
  server.use(passport.session())

  passport.use(new Strategy({
    clientID,
    clientSecret,
    callbackURL
  }, (accessToken, refreshToken, profile, cb) => cb(null, profile)))

  passport.serializeUser((user, cb) => {
    cb(null, user)
  })

  passport.deserializeUser((obj, cb) => {
    cb(null, obj)
  })

  server.get('/sitemap.xml', (req, res) => {
    const filePath = join(__dirname, 'static', 'sitemap.xml')
    return app.serveStatic(req, res, filePath)
  })

  server.get('/service-worker.js', (req, res) => {
    const filePath = join(__dirname, '.next', 'service-worker.js')
    return app.serveStatic(req, res, filePath)
  })
  server.get('/login', passport.authenticate('facebook'))

  server.get('/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => res.redirect('/'))

  server.get('/api/get/:id', (req, res) => {
    const id = req.params && req.params.id ? req.params.id : false
    if (!id || !validMongoId(id)) throw new Error('Not a valid id')
    collection.findOne({ _id: mongo.ObjectId(id) }, (error, data) => {
      if (error) throw error
      res.send(data)
    })
  })

  server.post('/api/save', (req, res) => {
    const payload = req.body
    collection.insert(payload, (error, data) => {
      if (error) throw error
      res.send(data)
    })
  })

  server.use(handler)

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
