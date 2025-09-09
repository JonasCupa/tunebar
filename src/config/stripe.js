// Stripe Configuration for TuneBar
export const stripeConfig = {
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_51S5T6nBDjzVf0ywL4QdNqJGCKmqLHGSqLGjKjFZvXcNrDtHqJjKjFZvXcNrDtH',
  priceId: 'price_1S5Y40BoNk0b5ndu2nBU3Eou', // ✅ TuneBar $3 product created in LIVE mode!
  successUrl: 'https://tunebar-app.vercel.app/success',
  cancelUrl: 'https://tunebar-app.vercel.app',
}
