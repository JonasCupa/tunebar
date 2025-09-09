# TuneBar Stripe Setup Guide

## 🚀 Setting Up Your Separate TuneBar Stripe Account

### Step 1: Create New Stripe Account
1. **Go to**: https://dashboard.stripe.com/register
2. **Use email**: `cupajonas+tunebar@gmail.com` (or create a separate email)
3. **Business name**: "TuneBar"
4. **Complete business verification** for TuneBar as a separate entity

### Step 2: Create Product and Price
1. In your TuneBar Stripe dashboard, go to **Products**
2. Click **Add product**
3. **Name**: "TuneBar - Mac Menu Bar Tuner"
4. **Price**: $3.00 USD (one-time payment)
5. **Copy the Price ID** (starts with `price_`)

### Step 3: Get Your API Keys
1. Go to **Developers > API keys** in your TuneBar Stripe dashboard
2. Copy your **Publishable key** (starts with `pk_test_` for test mode)
3. Copy your **Secret key** (starts with `sk_test_` for test mode)

### Step 4: Configure Your App

#### Option A: Environment Variables (Recommended)
Create a `.env.local` file in your project root:
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key_here
VITE_STRIPE_PRICE_ID=price_your_actual_price_id_here
```

#### Option B: Direct Configuration (For Testing)
Edit `src/config/stripe.js` and replace the placeholder values:
```javascript
export const stripeConfig = {
  publishableKey: 'pk_test_your_actual_key_here',
  priceId: 'price_your_actual_price_id_here',
  successUrl: window.location.origin + '/success',
  cancelUrl: window.location.origin,
}
```

### Step 5: Test the Integration
1. **Start your dev server**: `npm run dev`
2. **Click the download button** - it should redirect to Stripe checkout
3. **Use test card**: `4242 4242 4242 4242` with any future date and CVC
4. **Complete test purchase** to verify the flow works

### Step 6: Set Up Download Delivery
After successful payment, you need to:
1. **Upload your TuneBar.dmg** to a secure hosting service
2. **Update the success page** to trigger the actual download
3. **Consider using signed URLs** for security

### Step 7: Go Live
1. **Switch to live mode** in your Stripe dashboard
2. **Update your keys** to live keys (start with `pk_live_` and `sk_live_`)
3. **Test with real payment** (small amount first)

## 🔒 Security Notes
- Never commit API keys to version control
- Use environment variables for production
- Consider implementing webhook verification for robust payment handling
- Use signed download URLs to prevent unauthorized access

## 💡 Advanced Features (Optional)
- **Webhooks**: Set up webhooks to handle payment events
- **Customer Portal**: Let users manage their purchases
- **Promo Codes**: Enable discount codes in Stripe
- **Tax Collection**: Set up automatic tax calculation

## 🆘 Need Help?
- Check Stripe's documentation: https://stripe.com/docs
- Test with Stripe's test cards: https://stripe.com/docs/testing
- Use Stripe's webhook testing tool for development
