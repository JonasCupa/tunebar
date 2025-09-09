#!/usr/bin/env node

import Stripe from 'stripe';

// Your TuneBar Stripe secret key
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

async function createTuneBarProduct() {
  try {
    console.log('🚀 Creating TuneBar product in Stripe...\n');

    // Step 1: Create the product
    console.log('📦 Creating product...');
    const product = await stripe.products.create({
      name: 'TuneBar - Mac Menu Bar Tuner',
      description: 'Professional tuner app that lives in your Mac\'s menu bar. Minimal, precise, always within reach.',
      images: [], // You can add image URLs here later
      metadata: {
        app_name: 'TuneBar',
        platform: 'macOS',
        version: '1.0'
      }
    });

    console.log('✅ Product created:', product.id);

    // Step 2: Create the price
    console.log('💰 Creating price ($3.00)...');
    const price = await stripe.prices.create({
      currency: 'usd',
      unit_amount: 300, // $3.00 in cents
      product: product.id,
      nickname: 'TuneBar One-time Purchase'
    });

    console.log('✅ Price created:', price.id);

    // Step 3: Display results
    console.log('\n🎉 TuneBar product setup complete!\n');
    console.log('📋 Here are your details:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Product ID: ${product.id}`);
    console.log(`Price ID: ${price.id}`);
    console.log(`Product Name: ${product.name}`);
    console.log(`Price: $${price.unit_amount / 100}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('🔧 Next steps:');
    console.log('1. I\'ll update your config with the Price ID');
    console.log('2. Test the payment flow on your website');
    console.log('3. Switch to live keys when ready to go live\n');

    // Return the price ID for updating the config
    return {
      productId: product.id,
      priceId: price.id
    };

  } catch (error) {
    console.error('❌ Error creating product:', error.message);
    
    if (error.code === 'authentication_failed') {
      console.log('\n💡 Make sure your Stripe secret key is correct in the script.');
    }
    
    process.exit(1);
  }
}

// Run the setup
createTuneBarProduct().then((result) => {
  console.log(`🎯 Copy this Price ID: ${result.priceId}`);
  console.log('I\'ll now update your app configuration automatically!\n');
}).catch(console.error);
