const dev = process.env.NODE_ENV !== 'production'
if (dev) {
  require('dotenv').config()
}
const next = require('next')
const routes = require('./routes')
const mongo = require('mongojs')
const config = require('./config')
const validMongoId = require('./lib/valid-mongoid')
const { join } = require('path')

const app = next({ dev })
const handler = routes.getRequestHandler(app)
const port = parseInt(process.env.PORT, 10) || 3000
const express = require('express')

app.prepare().then(() => {
  const server = express()
  const db = mongo(config.DB_CONNECTION)
  const collection = db.collection(config.DB_COLLECTION)

  server.use(express.json())

  server.get('/service-worker.js', (req, res) => {
    const filePath = join(__dirname, '.next', 'service-worker.js')
    return app.serveStatic(req, res, filePath)
  })

  server.get('/api/login', (req, res) => {
    res.redirect('/')
  })

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
    console.log(payload)
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
