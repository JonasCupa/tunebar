#!/usr/bin/env node

import Stripe from 'stripe';

// Your TuneBar Stripe secret key
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

async function createPromotionCode() {
  try {
    console.log('🎫 Creating promotion code for TuneBar test coupon...\n');

    // First, check if the coupon exists
    let coupon;
    try {
      coupon = await stripe.coupons.retrieve('tunebar-test-100');
      console.log('✅ Found existing coupon:', coupon.id);
    } catch (error) {
      console.log('❌ Coupon not found, creating it first...');
      coupon = await stripe.coupons.create({
        id: 'tunebar-test-100',
        percent_off: 100,
        duration: 'once',
        name: 'TuneBar Test Coupon',
        metadata: {
          app_name: 'TuneBar',
          purpose: 'testing'
        }
      });
      console.log('✅ Created coupon:', coupon.id);
    }

    // Create a promotion code for the coupon
    const promotionCode = await stripe.promotionCodes.create({
      coupon: coupon.id,
      code: 'TUNEBAR-TEST-100',
      active: true,
      max_redemptions: 100, // Allow up to 100 uses for testing
      metadata: {
        app_name: 'TuneBar',
        purpose: 'testing'
      }
    });

    console.log('✅ Promotion code created successfully!\n');
    console.log('📋 Promotion Code Details:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Code: ${promotionCode.code}`);
    console.log(`Coupon: ${promotionCode.coupon}`);
    console.log(`Active: ${promotionCode.active}`);
    console.log(`Max Redemptions: ${promotionCode.max_redemptions}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('🧪 How to use for testing:');
    console.log('1. Go to your TuneBar checkout page');
    console.log('2. Click "Add promotion code"');
    console.log('3. Enter: TUNEBAR-TEST-100');
    console.log('4. Complete the checkout (it will be $0.00)');
    console.log('5. You\'ll still get redirected to the success page\n');

    console.log('⚠️  Important: This code gives 100% discount!');
    console.log('   Only use for testing - deactivate it when done testing.\n');

    return promotionCode;

  } catch (error) {
    console.error('❌ Error creating promotion code:', error.message);
    
    if (error.code === 'resource_already_exists') {
      console.log('\n💡 Promotion code already exists! You can use: TUNEBAR-TEST-100');
    }
    
    process.exit(1);
  }
}

// Run the setup
createPromotionCode().then((promotionCode) => {
  console.log(`🎯 Promotion code ready: ${promotionCode.code}`);
}).catch(console.error);
