// Stripe Configuration for TuneBar
export const stripeConfig = {
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_51S5T6nBDjzVf0ywL4QdNqJGCKmqLHGSqLGjKjFZvXcNrDtHqJjKjFZvXcNrDtH',
  priceId: 'price_1S5TPHBDjzVf0zu7F120lqIl', // ✅ TuneBar $3 product created!
  successUrl: 'https://tunebar-app.vercel.app/success',
  cancelUrl: 'https://tunebar-app.vercel.app',
}
