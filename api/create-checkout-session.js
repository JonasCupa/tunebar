import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    console.log('Creating checkout session...')
    console.log('Request body:', req.body)
    
    const { priceId, successUrl, cancelUrl } = req.body

    const sessionConfig = {
      line_items: [
        {
          price: priceId || 'price_1S5TPHBDjzVf0zu7F120lqIl',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || `${process.env.VERCEL_URL}/success`,
      cancel_url: cancelUrl || `${process.env.VERCEL_URL}`,
      billing_address_collection: 'auto',
      allow_promotion_codes: true,
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // 30 minutes from now
    }

    console.log('Session config:', sessionConfig)

    const session = await stripe.checkout.sessions.create(sessionConfig)

    console.log('Session created successfully:', session.id)
    console.log('Session URL:', session.url)
    
    res.json({ 
      id: session.id,
      url: session.url 
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    console.error('Error details:', error.message)
    res.status(500).json({ 
      error: error.message,
      type: error.type,
      code: error.code 
    })
  }
}
