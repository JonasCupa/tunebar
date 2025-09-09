import { loadStripe } from '@stripe/stripe-js'
import { stripeConfig } from '../config/stripe.js'

// Initialize Stripe
let stripePromise = null

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripeConfig.publishableKey)
  }
  return stripePromise
}

// Create checkout session and redirect to Stripe
export const createCheckoutSession = async () => {
  try {
    console.log('Starting checkout process...')
    console.log('Price ID:', stripeConfig.priceId)
    
    const stripe = await getStripe()
    
    if (!stripe) {
      throw new Error('Stripe failed to initialize')
    }

        // Create checkout session via Vercel API
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            priceId: stripeConfig.priceId,
            successUrl: stripeConfig.successUrl,
            cancelUrl: stripeConfig.cancelUrl,
          }),
        })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Backend error:', errorData)
      console.error('Response status:', response.status)
      console.error('Response headers:', response.headers)
      throw new Error(`Backend error: ${response.status} - ${errorData}`)
    }

    const sessionData = await response.json()
    console.log('Checkout session created:', sessionData)
    
    const { id: sessionId, url: sessionUrl } = sessionData

    // Try direct redirect first, then fallback to sessionId
    if (sessionUrl) {
      console.log('Redirecting to session URL:', sessionUrl)
      window.location.href = sessionUrl
      return
    }

    // Fallback to redirectToCheckout
    const { error } = await stripe.redirectToCheckout({
      sessionId: sessionId,
    })

    if (error) {
      console.error('Stripe checkout error:', error)
      throw error
    }
  } catch (error) {
    console.error('Checkout session error:', error)
    throw new Error('Failed to start checkout process')
  }
}

// Alternative: Create checkout session via your backend (more secure)
export const createCheckoutSessionViaBackend = async () => {
  try {
    // This would call your backend endpoint to create the session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: stripeConfig.priceId,
        successUrl: stripeConfig.successUrl,
        cancelUrl: stripeConfig.cancelUrl,
      }),
    })

    const session = await response.json()

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    })

    if (error) {
      console.error('Stripe checkout error:', error)
      throw error
    }
  } catch (error) {
    console.error('Backend checkout error:', error)
    throw new Error('Failed to start checkout process')
  }
}
