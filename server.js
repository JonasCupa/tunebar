import express from 'express'
import Stripe from 'stripe'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

// Stripe checkout session endpoint
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { priceId, successUrl, cancelUrl } = req.body

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId || 'price_1S5TPHBDjzVf0zu7F120lqIl', // TuneBar $3 product
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || `${req.protocol}://${req.get('host')}/success`,
      cancel_url: cancelUrl || `${req.protocol}://${req.get('host')}`,
      billing_address_collection: 'auto',
      allow_promotion_codes: true,
    })

    res.json({ id: session.id })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    res.status(500).json({ error: error.message })
  }
})

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Stripe checkout endpoint: http://localhost:${PORT}/api/create-checkout-session`)
})
