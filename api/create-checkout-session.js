import Stripe from 'stripe'

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')
  
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    console.log('Creating checkout session...')
    console.log('Request body:', req.body)
    
    // Check if Stripe secret key is available
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY environment variable is not set')
      return res.status(500).json({ 
        error: 'Stripe secret key not configured',
        details: 'Please check environment variables in Vercel'
      })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const { priceId, successUrl, cancelUrl } = req.body

    const sessionConfig = {
      line_items: [
        {
          price: priceId || 'price_1S5Y40BoNk0b5ndu2nBU3Eou',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || 'https://tunebar-app.vercel.app/success',
      cancel_url: cancelUrl || 'https://tunebar-app.vercel.app',
      billing_address_collection: 'auto',
      allow_promotion_codes: true,
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // 30 minutes from now
      // Custom branding for TuneBar
      custom_text: {
        submit: {
          message: 'Thank you for purchasing TuneBar! Your download will be available after payment.'
        }
      },
      metadata: {
        app_name: 'TuneBar',
        business: 'TuneBar'
      }
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
