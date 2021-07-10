const router = require('express').Router()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
  appInfo: { // For sample support and debugging, not required for production:
    name: 'Sophonaut/bigfive-web',
    version: '0.0.1',
    url: 'https://github.com/Sophonaut/bigfive-web'
  }
})

router.get('/config', async (req, res) => {
  const price = await stripe.prices.retrieve(process.env.PRICE)

  res.send({
    publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
    unitAmount: price.unit_amount,
    currency: price.currency
  })
})

router.post('/create-checkout-session', async (req, res) => {
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
    success_url: `${domainURL}/signup?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainURL}/canceled.html`
  })

  res.send({
    sessionId: session.id
  })
})

router.post('/webhook', async (req, res) => {
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

  res.sendStatus(200)
  if (eventType === 'checkout.session.completed') {
    // passport.authenticate('local')
    const stringifiedData = encodeURIComponent(data)

    console.log('🔔  Payment received!')

    res.redirect('/signup?data=' + stringifiedData)
  }
})

module.exports = router
