#!/usr/bin/env node

import Stripe from 'stripe';

// Your TuneBar Stripe secret key
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

async function createTestCoupon() {
  try {
    console.log('🎫 Creating test coupon for TuneBar...\n');

    // Create a 100% discount coupon for testing
    const coupon = await stripe.coupons.create({
      id: 'tunebar-test-100',
      percent_off: 100,
      duration: 'once',
      name: 'TuneBar Test Coupon',
      metadata: {
        app_name: 'TuneBar',
        purpose: 'testing'
      }
    });

    console.log('✅ Test coupon created successfully!\n');
    console.log('📋 Coupon Details:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Coupon ID: ${coupon.id}`);
    console.log(`Name: ${coupon.name}`);
    console.log(`Discount: ${coupon.percent_off}% off`);
    console.log(`Duration: ${coupon.duration}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('🧪 How to use for testing:');
    console.log('1. Go to your TuneBar checkout page');
    console.log('2. Click "Add promotion code"');
    console.log('3. Enter: tunebar-test-100');
    console.log('4. Complete the checkout (it will be $0.00)');
    console.log('5. You\'ll still get redirected to the success page\n');

    console.log('⚠️  Important: This coupon gives 100% discount!');
    console.log('   Only use for testing - delete it when done testing.\n');

    return coupon;

  } catch (error) {
    console.error('❌ Error creating coupon:', error.message);
    
    if (error.code === 'resource_already_exists') {
      console.log('\n💡 Coupon already exists! You can use: tunebar-test-100');
    }
    
    process.exit(1);
  }
}

// Run the setup
createTestCoupon().then((coupon) => {
  console.log(`🎯 Test coupon ready: ${coupon.id}`);
}).catch(console.error);
