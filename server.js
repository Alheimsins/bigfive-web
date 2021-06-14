const dev = process.env.NODE_ENV !== 'production'
if (dev) {
  require('dotenv').config()
}
const next = require('next')
const routes = require('./routes')
const mongo = require('mongojs')
const helmet = require('helmet')
const requestCountry = require('request-country')
const config = require('./config')
const validMongoId = require('./lib/valid-mongoid')
const { join } = require('path')
const i18nextMiddleware = require('i18next-express-middleware')
const Backend = require('i18next-node-fs-backend')
const i18n = require('./i18n')

const app = next({ dev })
const handler = routes.getRequestHandler(app)
const port = parseInt(process.env.PORT, 10) || 3000
const express = require('express')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
  appInfo: { // For sample support and debugging, not required for production:
    name: 'Sophonaut/bigfive-web',
    version: '0.0.1',
    url: 'https://github.com/Sophonaut/bigfive-web'
  }
})

i18n
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(
    {
      fallbackLng: 'en',
      preload: ['en', 'es'], // Preload all languages
      ns: ['common', 'home'], // Need to preload all the namespaces
      backend: {
        loadPath: join(__dirname, '/locales/{{lng}}/{{ns}}.json'),
        addPath: join(__dirname, '/locales/{{lng}}/{{ns}}.missing.json')
      }
    },
    () => {
      // Loaded translations we can bootstrap our routes
      app.prepare().then(() => {
        const server = express()
        const db = mongo(config.DB_CONNECTION)
        const collection = db.collection(config.DB_COLLECTION)

        server.use(helmet())
        server.use(express.json())
        server.use(i18nextMiddleware.handle(i18n)) // Enable middleware for i18next
        server.use('/locales', express.static(join(__dirname, '/locales'))) // Serve locales for client
        server.use(requestCountry.middleware({
          privateIpCountry: 'en'
        }))

        server.get('/sitemap.xml', (req, res) => {
          const filePath = join(__dirname, 'static', 'sitemap.xml')
          return app.serveStatic(req, res, filePath)
        })

        server.get('/service-worker.js', (req, res) => {
          const filePath = join(__dirname, '.next', 'service-worker.js')
          return app.serveStatic(req, res, filePath)
        })

        server.get('/api/login', (req, res) => {
          res.redirect('/')
        })

        server.get('/api/config', async (req, res) => {
          const price = await stripe.prices.retrieve(process.env.PRICE)

          res.send({
            publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
            unitAmount: price.unit_amount,
            currency: price.currency
          })
        })

        server.post('/api/create-checkout-session', async (req, res) => {
          const domainURL = process.env.DOMAIN

          const { quantity, locale } = req.body

          // The list of supported payment method types. We fetch this from the
          // environment variables in this sample. In practice, users often hard code a
          // list of strings for the payment method types they plan to support.
          const pmTypes = (process.env.PAYMENT_METHOD_TYPES || 'card').split(',').map((m) => m.trim())

          // Create new Checkout Session for the order
          // Other optional params include:
          // [billing_address_collection] - to display billing address details on the page
          // [customer] - if you have an existing Stripe Customer ID
          // [customer_email] - lets you prefill the email input in the Checkout page
          // For full details see https://stripe.com/docs/api/checkout/sessions/create
          const session = await stripe.checkout.sessions.create({
            payment_method_types: pmTypes,
            mode: 'payment',
            locale: locale,
            line_items: [
              {
                price: process.env.PRICE,
                quantity: quantity
              }
            ],
            // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
            success_url: `${domainURL}/home?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${domainURL}/canceled.html`
          })

          res.send({
            sessionId: session.id
          })
        })

        server.post('/api/webhook', async (req, res) => {
          let data
          let eventType
          // Check if webhook signing is configured.
          if (process.env.STRIPE_WEBHOOK_SECRET) {
            // Retrieve the event by verifying the signature using the raw body and secret.
            let event
            const signature = req.headers['stripe-signature']

            try {
              event = stripe.webhooks.constructEvent(
                req.rawBody,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
              )
            } catch (err) {
              console.log('⚠️  Webhook signature verification failed.')
              return res.sendStatus(400)
            }
            // Extract the object from the event.
            data = event.data
            eventType = event.type
          } else {
            // Webhook signing is recommended, but if the secret is not configured in `config.js`,
            // retrieve the event data directly from the request body.
            data = req.body.data
            eventType = req.body.type
          }

          if (eventType === 'checkout.session.completed') {
            console.log('🔔  Payment received!')
          }

          res.sendStatus(200)
        })

        server.get('/api/get/:id', (req, res) => {
          const id = req.params && req.params.id ? req.params.id : false
          if (!id || !validMongoId(id)) throw new Error('Not a valid id')
          collection.findOne({ _id: mongo.ObjectId(id) }, (error, data) => {
            if (error) throw error
            res.send(data)
          })
        })

        server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n))

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
    }
  )
